import { prisma } from "@/clients/prismaclient";
export class Webseries{
    public static async createWebSeries(title : string , description : string ,  imageurl : string ){
        const newMovie  = await prisma.webseries.create({
            data : {
                title : title , 
                description : description , 
                imageurl : imageurl , 
            },
        

        })

        return newMovie ; 
    }

    public static async getwebseries (){
        const allseries = await prisma.webseries.findMany({
            orderBy : {
                createdAt : 'desc'
            } , 
            include : {
                episodes : true
            }
        })

        return allseries
    }

    public static  async  getWebseriesbyId(id  : string){
        const webseries = await prisma.webseries.findUnique({
            where : {
                id : id 
            },
            include : {
                episodes : true
            }
        })
        return webseries ; 
    }

    public static async createEpisode(title : string  , description : string , videourl  : string , webseriesId  : string){
        const episode = await prisma.episode.create({
            data : {
                title , 
                description , 
                videourl , 
                webseriesId
            }
        })
        return episode
    }

    public static async getEpisodebyId(id : string){
        const episode = await prisma.episode.findUnique({
            where : {
                id : id 
            }
        })
        return episode ; 
    }



    public static async getWebSeriesbyquery (query : string){
        const webseries = await prisma.webseries.findMany({
            where : {
                OR : [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query , mode: 'insensitive' } },
                ]
            }
        })

        return webseries ; 
    }
}