import {Webseries}  from "@/services/WebseriseS"


export  async function POST(request : Request ){
    try {
        const data = await request.json()
        console.log(data)

        

        await Webseries.createEpisode(data.title , data.description , data.videourl , data.webseriesId)
    
        return Response.json({message : "Created successfully"}  , {status : 201 }) 
    } catch (error) {
        console.log(error)
        return Response.json({message : "something went wrong"}  , {status : 401 }) 
    }

}

