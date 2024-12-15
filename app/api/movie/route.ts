import { MovieService } from "@/services/MovieService";

export  async function POST(request : Request ){
    try {
        const data = await request.json()
        console.log(data)

        

        await MovieService.createMovie(data.title , data.description , data.videourl , data.imageurl  , data.posterimageurl)
    
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
                const data = await MovieService.getmovies() 

                return Response.json({movies : data })
            }else{
                const query = url.search.split("=")[1]
                const data = await MovieService.getMoviesbyquery(query)
                return Response.json({movies : data })

            }

            

        } catch (error) {
            console.log(error)

            return Response.json({message : "something went wrong"}  , {status : 401 }) 
        }
}