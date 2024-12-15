import MovieDetail from "@/app/clientComponents/MovieDetail"
import {  Movie } from "@/interfaces"


interface  Movies{
    movies : Movie[]
}

interface MovieDetails{
    data : Movie
}


 
export async function generateStaticParams() {
  const response :Movies  = await fetch('https://watchify-topaz.vercel.app/api/movie'  ,    { next: { revalidate: 60 * 60 * 24 }}).then((res) =>
    res.json()
  )
  const data  : Movie[] = response.movies
  return data.map((Web) => ({
    id: String(Web.id),
  }))
}
 
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const data: MovieDetails = await fetch(`https://watchify-topaz.vercel.app/api/movie/${id}`  , { next: { revalidate: 60 * 60 * 24 }}).then(
    (res) => res.json()
  )

    if(data.data==null){
        return (
            <div className="text-center font-bold text-2xl  mt-10 ">Web not found !</div>
        )
    }


    return(
        <MovieDetail movie={data.data}/>
    )
}