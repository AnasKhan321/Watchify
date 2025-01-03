import axios from "axios";
import HomePage from "./clientComponents/HomePage";

export default async function Page() {
  const res1 =  await fetch(`https://watchify-topaz.vercel.app/api/movie`  , { next: { revalidate: 3600 } } )
  const mdata = await res1.json() 
  const res = await fetch("https://watchify-topaz.vercel.app/api/webseries" ,{ next: { revalidate: 3600 } } )
  const ndata = await res.json()  ; 

  return(
    <HomePage movies={mdata.movies}  webseries={ndata.webseries}/> 
  )
}
