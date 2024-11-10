import { MovieService } from "@/services/MovieService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest , response : NextResponse){
    try {
        const id = request.url.split("/").pop()
        if(id){
            const data = await MovieService.getMovieId(id)
            return NextResponse.json({data : data  }  , {status : 200})
        }else{
            return NextResponse.json({message : "invalid id"}  , {status : 500})
        }
    



    } catch (error) {
        return NextResponse.json({message : "something went worng !"}  , {status : 500 }) 
    }

}