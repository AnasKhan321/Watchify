import { MovieService } from "@/services/MovieService";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(request : NextRequest , response : NextResponse){
    try {
        const data = await request.json()
        console.log(data)

        

        await MovieService.createMovie(data.title , data.description , data.videourl , data.imageurl  , data.posterimageurl)
    
        return NextResponse.json({message : "Created successfully"}  , {status : 201 }) 
    } catch (error) {
        console.log(error)
        return NextResponse.json({message : "something went wrong"}  , {status : 401 }) 
    }

}


export async function GET(request : NextRequest , response : NextResponse) {
        try {
            
            const url = new URL(request.url)
            console.log(url )
            console.log(url.searchParams)

            if(url.search == ''){
                const data = await MovieService.getmovies() 

                return NextResponse.json({movies : data })
            }else{
                const query = url.search.split("=")[1]
                const data = await MovieService.getMoviesbyquery(query)
                return NextResponse.json({movies : data })

            }

            

        } catch (error) {
            console.log(error)

            return NextResponse.json({message : "something went wrong"}  , {status : 401 }) 
        }
}