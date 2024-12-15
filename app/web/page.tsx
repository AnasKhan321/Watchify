'use client'

import { useState  , useEffect} from 'react'
import { Input } from "@/components/ui/input"
import { useDebounceValue } from 'usehooks-ts'
import Navbar from '../clientComponents/Navbar'
import axios from "axios"
import { Webseries } from '@/interfaces'
import {ScaleLoader}  from 'react-spinners'
import WebCard from '../clientComponents/WebCard'

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('')

  const [debouncedValue, setValue] = useDebounceValue(searchQuery, 500)
  const [movies , setMovies]  = useState<Webseries[]>([])
  const [isLoading , setisLoading]  = useState(false)

  useEffect(()=>{

        ;(async()=>{
          try {
            setisLoading(true)
            console.log(debouncedValue)
            const {data}  = await axios.get(`https://watchify-topaz.vercel.app/api/webseries?query=${debouncedValue}`)
            setMovies(data.webseries)
            setisLoading(false)
          } catch (error) {
                console.log(error)
                setMovies([])
                setisLoading(false)
          }

        })()
  },[debouncedValue])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic here

  }

  return (
    <> 
    <Navbar/>
    <div className="min-h-screen mt-10  bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Tv Shows</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-red-900/30 border-red-700 text-white"
            />
          </div>

        </form>

        <div className=" mt-10  mb-10   px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {!isLoading &&  <> 

                {movies.map((movie)=>(
                <WebCard key={movie.id} web={movie}/>
                ))}  
                </> 
                }
        
        </div>

        {isLoading  && <div className='flex justify-center items-center container mx-auto   mt-[100px]  '><ScaleLoader width={6} color="#ffffff"    height={50}/>  </div>}
        {!isLoading && <> {movies.length ==0 && <div className='text-center font-bold text-4xl '> No WebSeries Found ! </div>} </>}

      </div>
    </div>
    </>
  )
}