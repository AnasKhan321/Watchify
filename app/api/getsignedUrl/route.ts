
import { MovieService } from "@/services/MovieService";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest ,NextResponse } from "next/server";

export async function  POST(request: Request)  {
    try {
        const body = await request.json()
        const signedUrl  =await  MovieService.SignedUrl(body.imageName , body.imageName)
        return Response.json({url : signedUrl })
    } catch (error) {
        return Response.json({message : "something went wrong! "})
    }

}