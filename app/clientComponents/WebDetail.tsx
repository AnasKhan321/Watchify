'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import VideoPlayer from './VidePlayet'

interface Episode {
  id: string
  title: string
  description: string
  videourl: string
  webseriesId: string
  createdAt: string
  updatedAt: string
}

interface Webseries {
  id: string
  title: string
  description: string
  imageurl: string
  episodes: Episode[]
  createdAt: string
  updatedAt: string
}

const formatDate = (date: string) => {
  const rdate = new Date(date)
  return `${rdate.getDate()}/${rdate.getMonth() + 1}/${rdate.getFullYear()}`
}

export default function WebSeriesDetail({ webseries }: { webseries: Webseries }) {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(
    webseries.episodes.length > 0 ? webseries.episodes[0] : null
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="absolute inset-0">
          <Image 
            src={webseries.imageurl} 
            alt={webseries.title} 
            width={1500} 
            height={0} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 md:mr-8">
            <Image
              src={webseries.imageurl}
              alt={`${webseries.title} Poster`}
              width={500}
              height={750}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{webseries.title}</h1>
            <p className="text-lg md:text-xl mb-6">{webseries.description}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#videoplayer">
                <Button size="lg" className="text-white bg-red-600 hover:bg-red-700">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Now
                </Button>
              </a>
              <Badge variant="outline" className="text-gray-300 border-gray-300">
                {webseries.episodes.length} Episodes
              </Badge>
            </div>
            <div className="text-sm text-gray-400">
              <p>Added on: {formatDate(webseries.createdAt)}</p>
              <p>Last updated: {formatDate(webseries.updatedAt)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-12" id="videoplayer">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-semibold mb-6 text-center">
            {selectedEpisode ? `Now Playing: ${selectedEpisode.title}` : 'Select an Episode'}
          </h2>
          {selectedEpisode && <VideoPlayer src={selectedEpisode.videourl} />}
          
        </div>
      </section>

      <section className="bg-black py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-semibold mb-6">Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webseries.episodes.map((episode) => (
              <div 
                key={episode.id} 
                className="bg-gradient-to-b from-red-900/20 to-black   rounded-lg overflow-hidden shadow-lg cursor-pointer hover:bg-red-900/40 transition-colors"
                onClick={() => setSelectedEpisode(episode)}
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{episode.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{episode.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Added: {formatDate(episode.createdAt)}</span>
                    <Button size="sm" variant="outline">
                      <Play className="mr-1 h-4 w-4" />
                      Play
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
