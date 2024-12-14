import axios from "axios";
import HomePage from "./clientComponents/HomePage";

// dynamic page
export const dynamic = 'force-dynamic'
export default async function Page() {
  const {data} =  await axios.get(`https://watchify-topaz.vercel.app/api/movie`)
  const res = await fetch("https://watchify-topaz.vercel.app/api/webseries")
  const ndata = await res.json()  ; 

  return(
    <HomePage movies={data.movies}  webseries={ndata.webseries}/> 
  )
}
