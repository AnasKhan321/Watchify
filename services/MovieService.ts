import { prisma } from "@/clients/prismaclient";
import { S3Client, PutObjectCommand   } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { title } from "process";

const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
    }
})

const bucket = process.env.AWS_WATCHIFY_BUCKET

export class MovieService{

    public static async  SignedUrl (imageName : string , imageType : string){
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: `uploads/${imageName}`, // Use the name directly without appending the extension
            ContentType: imageType, // Specify the content type
        });
        const signedUrl  = await getSignedUrl(client , command , { expiresIn: 900 })

        return signedUrl ; 
    }

    public static async createMovie(title : string , description : string , videourl : string , imageurl : string   , posterimageurl : string){
        const newMovie  = await prisma.movie.create({
            data : {
                title : title , 
                description : description , 
                imageurl : imageurl , 
                videourl : videourl,
                posterimageurl : posterimageurl
            },
        

        })

        return newMovie ; 
    }

    public static async getmovies (){
        const allmovies = await prisma.movie.findMany({
            orderBy : {
                createdAt : 'desc'
            }
        })

        return allmovies
    }

    public static async getMovieId(id : string){
        const movie = await prisma.movie.findUnique({
            where : {
                id : id 
            }
        })
        return movie ; 
    }


    public static async getMoviesbyquery (query : string){
        const movies = await prisma.movie.findMany({
            where : {
                OR : [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query , mode: 'insensitive' } },
                ]
            }
        })

        return movies ; 
    }

}