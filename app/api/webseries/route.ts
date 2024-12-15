import {Webseries}  from "@/services/WebseriseS"


export  async function POST(request : Request ){
    try {
        const data = await request.json()
        await Webseries.createWebSeries(data.title , data.description , data.imageurl)
        return Response.json({message : "Created successfully"}  , {status : 201 }) 
    } catch (error) {
        console.log(error)
        return Response.json({message : "something went wrong"}  , {status : 401 }) 
    }
}


export async function GET(request : Request) {
    try {
        const url = new URL(request.url)
        if(url.search == ''){
            const data = await Webseries.getwebseries() 
            return Response.json({webseries : data })
        }else{
            const query = url.search.split("=")[1]
            const data = await Webseries.getWebSeriesbyquery(query)
            return Response.json({webseries : data })
        }

    } catch (error) {
        console.log(error)

        return Response.json({message : "something went wrong"}  , {status : 401 }) 
    }
}