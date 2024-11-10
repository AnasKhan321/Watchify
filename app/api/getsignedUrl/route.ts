
import { MovieService } from "@/services/MovieService";
import { NextRequest ,NextResponse } from "next/server";

export async function  POST(request  : NextRequest , response  : Request ) {
    try {
        const body = await request.json()
        const signedUrl  =await  MovieService.SignedUrl(body.imageName , body.imageName)
        return NextResponse.json({url : signedUrl })
    } catch (error) {
        return NextResponse.json({message : "something went wrong! "})
    }

}