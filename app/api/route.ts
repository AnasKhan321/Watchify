import {NextRequest , NextResponse}  from "next/server"
import {S3Client , ListObjectsV2Command }  from '@aws-sdk/client-s3'
import redisClient from "@/clients/redisclient"
import  { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs'


const ecsClient = new ECSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
    }
})

const config = {
    CLUSTER: process.env.AWS_CLUSTER,
    TASK: process.env.AWS_TASK
}


export async function GET(){
    await checkForNewUploads() 
    return NextResponse.json({data : "this is here"})
}


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
    }
})



async function checkForNewUploads() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_PREFETCH_BUCKET,
        });
  //@ts-expect-error
        const response = await s3Client.send(command);
        console.log(response.Contents)


        if(response.Contents ){
            if(response.Contents.length > 0 ){
          //@ts-expect-error
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
                        const uploaded_url = `
                        ${process.env.AWS_POST_VIDEO_URL}${lastobject.Key}`
                        const full_video_name = lastobject.Key.split("/")[1]
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
    } catch (error) {
        console.error('Error checking for new uploads:', error);
    }
}



const runnewTask = async(videourl : string , videoname : string , full_video_name : string)=>{
    const command = new RunTaskCommand({
        cluster: config.CLUSTER,
        taskDefinition: config.TASK,
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
                    name: process.env.AWS_TASK_IMAGE_NAME,
                    environment: [
                        { name: 'S3_URL', value: videourl },
                        { name: 'videoname', value: videoname },
                        {name : "full_video_name"  , value : full_video_name}
                    ]
                }
            ]
        }
    })
      //@ts-expect-error
    await ecsClient.send(command)
}