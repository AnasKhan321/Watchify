import {NextRequest , NextResponse}  from "next/server"
import {S3Client , ListObjectsV2Command }  from '@aws-sdk/client-s3'
import redisClient from "@/clients/redisclient"
import  { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs'


const ecsClient = new ECSClient({ 
    region: process.env.AWS_REGION as string ,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID  as string ,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET  as string
    }
})

const config = {
    CLUSTER: process.env.AWS_CLUSTER as string ,
    TASK: process.env.AWS_TASK as string 
}


export async function GET(request : Request){
    await checkForNewUploads() 
    return Response.json({data : "this is here"})
}


const s3Client = new S3Client({
    region: process.env.AWS_REGION as string   ,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string ,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET as string 
    }
})



async function checkForNewUploads() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_PREFETCH_BUCKET as string ,
        });

        const response = await s3Client.send(command);
        console.log(response.Contents)


        if(response.Contents ){
            if(response.Contents.length > 0 ){

                const sortedObjects = response.Contents.sort((a, b) => 
                    (a.LastModified?.getTime() || 0) - (b.LastModified?.getTime() || 0)
                );
                console.log(sortedObjects)
    
                const lastobject = sortedObjects[sortedObjects.length-1]
                const lastuploadedobject = await redisClient.get("lastobject")
                if(lastuploadedobject){
                    if(lastuploadedobject == lastobject.Key){
                        console.log("already uploaded")

                    }else{
                        if(lastobject.Key){
                            const uploaded_url = `${process.env.AWS_POST_VIDEO_URL}${lastobject.Key}`
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            const full_video_name = lastobject.Key.split("/")[1]
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            const videoname = full_video_name.split(".")[0]
                            console.log(uploaded_url)
                            console.log(full_video_name)
                            console.log(videoname)
                            const runtask = await runnewTask(uploaded_url  , videoname , full_video_name)
                            await redisClient.set("lastobject"  , lastobject.Key)
                            console.log("Uploaded")
                        }

                    }
                }
            }
        }
    } catch (error) {
        console.error('Error checking for new uploads:', error);
    }
}



const runnewTask = async(videourl : string , videoname : string , full_video_name : string)=>{
    const command = new RunTaskCommand({
        cluster: config.CLUSTER as string ,
        taskDefinition: config.TASK as string ,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: 'ENABLED',
                subnets: ['subnet-088117033df2f6c23', 'subnet-0ab3f4e0da7b896fc', 'subnet-09316e97b45c1a202'],
                securityGroups: ['sg-0e8d35b6015762619']
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: process.env.AWS_TASK_IMAGE_NAME as string,
                    environment: [
                        { name: 'S3_URL', value: videourl },
                        { name: 'videoname', value: videoname },
                        {name : "full_video_name"  , value : full_video_name}
                    ]
                }
            ]
        }
    })
    await ecsClient.send(command)
}