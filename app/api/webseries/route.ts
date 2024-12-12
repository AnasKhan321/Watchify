import {Webseries}  from "@/services/WebseriseS"


export  async function POST(request : Request ){
    try {
        const data = await request.json()
        console.log(data)

        

        await Webseries.createWebSeries(data.title , data.description , data.imageurl)
    
        return Response.json({message : "Created successfully"}  , {status : 201 }) 
    } catch (error) {
        console.log(error)
        return Response.json({message : "something went wrong"}  , {status : 401 }) 
    }

}


export async function GET(request : Request) {
        try {
            const data = await Webseries.getwebseries() ; 

            return Response.json({webseries : data })
        } catch (error) {
            return Response.json({message : "something went wrong"}  , {status : 401 }) 
        }
}