"use client"
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play } from 'lucide-react'
import { Webseries } from '@/interfaces'
import Image from "next/image"


export default function WebCard({web }  : {web : Webseries}) {
  const [isHovered, setIsHovered] = useState(false)


  return (
    <Card 
      className="relative cursor-pointer overflow-hidden  hover:ring-2 hover:ring-red-600 border-0  group bg-red-900/10  transition-all duration-300 ease-in-out hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden">

        <Image src={web.imageurl}   alt={web.title}  width={500}  height={0} className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"/>

      </div>
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      <CardContent className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
        <h3 className=" text-sm  md:text-base lg:text-xl font-bold mb-2 text-white">{web.title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{web.description.slice(0 , 80 )}</p>
        <div className="flex space-x-2 mb-4">
          <Badge variant="secondary" className="bg-red-600 text-white">
            {new Date(web.createdAt).getFullYear()}
          </Badge>

        </div>
        <div className="flex space-x-2">

        <a href={`/web/${web.id}`}>

        <Button size="sm" className="bg-white text-black hover:bg-gray-200" >
            <Play className="w-4 h-4 mr-2" /> Play
          </Button></a>

        </div>
      </CardContent>
    </Card>
  )
}