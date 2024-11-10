import { Movie } from '@/interfaces'
import Navbar from './Navbar'
import Slides  from "./Slides"
import MovieCard from './MovieCard'
import Footer from './Footer'


export default function HomePage({movies}  : {movies : Movie[]}) {

  return (
    <div className="min-h-screen bg-black text-white">

      <div>
        <Slides movies={movies}/> 
      </div>


      <div className=" mt-10  mb-10   px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">


              {movies.map((movie)=>(
                <MovieCard movie={movie}/>
              ))}
            </div>




    </div>
  )
}