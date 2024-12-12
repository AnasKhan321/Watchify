import { Movie, Webseries } from '@/interfaces'
import Navbar from './Navbar'
import Slides  from "./Slides"
import MovieCard from './MovieCard'
import Footer from './Footer'
import WebCard from './WebCard'


export default function HomePage({movies  , webseries}  : {movies : Movie[]  , webseries : Webseries[]}) {

  return (
    <div className="min-h-screen bg-black text-white">

      <div>
        <Slides movies={movies}/> 
      </div>

      <h3  className='px-8 font-bold text-3xl '>Movies</h3>

      <div className=" mt-10  mb-10   px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">


              {movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </div>


            <h3  className='px-8 font-bold text-3xl '>Tv Shows</h3>
      <div className=" mt-10  mb-10   px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

              
                {webseries.map((web)=>(
                  <WebCard  key={web.id}  web={web}/> 
                
                ))}
</div>




    </div>
  )
}