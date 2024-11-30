import { Button } from "@/components/ui/button"
import {  Play } from 'lucide-react'
import { Movie } from '@/interfaces'
import Image from "next/image"
import VideoPlayer from './VidePlayet'
import { Badge } from "@/components/ui/badge"

const formateDate = (date : string)=>{
    const rdate = new Date(date)

    return `${rdate.getDate()}/${rdate.getMonth()+1}/${rdate.getFullYear()}`

}

export default function MovieDetail( {movie}  : {movie : Movie}) {



  return (
    <div className="min-h-screen bg-black text-white">



      <section className="relative pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="absolute inset-0">
          <Image src={movie.posterimageurl}  alt={movie.title}  width={1500}  height={0}  className="w-full h-full object-cover"  />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 md:mr-8">
          <Image
            src={movie.imageurl} 
            alt={`${movie.title} Poster`}
            width={500}  
            height={750}
            className="w-full rounded-lg shadow-lg"
          />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            <p className="text-lg md:text-xl mb-6">{movie.description}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#videoplayer">
              <Button size="lg" className="text-white bg-red-600 hover:bg-red-700" >
                  <Play className="mr-2 h-5 w-5" />
              Play  
              </Button>
              </a>


              <Badge variant="outline" className="text-gray-300 border-gray-300">
            {movie.Quality}
          </Badge>


            </div>
            <div className="text-sm text-gray-400">
              <p>Added on: {formateDate(movie.createdAt)} </p>

            </div>
          </div>
        </div>
      </section>
      <section className="bg-black py-12 "id='videoplayer'>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center">Watch Now</h2>
   
            <VideoPlayer src={movie.videourl}/>

        </div>
      </section>


    </div>
  )
}