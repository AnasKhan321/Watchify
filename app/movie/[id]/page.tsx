import MovieDetail from "@/app/clientComponents/MovieDetail"
import { Movie } from "@/interfaces"


interface  Movies{
    movies : Movie[]
}

interface MovieDetail{
    data : Movie
}

export const revalidate = 60*60*24
 
export const dynamicParams = true 
 
export async function generateStaticParams() {
  const response :Movies  = await fetch('https://watchify-topaz.vercel.app/api/movie').then((res) =>
    res.json()
  )
  const data  : Movie[] = response.movies
  return data.map((movie) => ({
    id: String(movie.id),
  }))
}
 
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const data: MovieDetail = await fetch(`https://watchify-topaz.vercel.app/api/movie/${id}`).then(
    (res) => res.json()
  )

    if(data.data==null){
        return (
            <div className="text-center font-bold text-2xl  mt-10 ">Movie not found !</div>
        )
    }


    return(
        <MovieDetail movie={data.data}/>
    )
}