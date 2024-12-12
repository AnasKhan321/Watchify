import {Webseries}  from "@/services/WebseriseS"


export async function GET(request : Request){
    try {
        const id = request.url.split("/").pop()
        if(id){
            const data = await Webseries.getEpisodebyId(id)
            return Response.json({data : data  }  , {status : 200})
        }else{
            return Response.json({message : "invalid id"}  , {status : 500})
        }
    



    } catch (error) {
        return Response.json({message : "something went worng !"}  , {status : 500 }) 
    }

}