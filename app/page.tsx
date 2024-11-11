import axios from "axios";
import HomePage from "./clientComponents/HomePage";
export const dynamic = 'force-dynamic'
export default async function Page() {
  const {data} =  await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/movie`)


  return(
    <HomePage movies={data.movies}/> 
  )
}
