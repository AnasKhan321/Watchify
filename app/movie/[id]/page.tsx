import MovieDetail from "@/app/clientComponents/MovieDetail";
import axios from "axios";

export default async function Page({params}  : { params: Promise<{ id: string }>}){
    const parameters = await params ; 

    const {data }  = await  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/movie/${parameters.id}`)


    if(data.data==null){
        return (
            <div className="text-center font-bold text-2xl  mt-10 ">Movie not found !</div>
        )
    }


    return(
        <MovieDetail movie={data.data}/>
    )
}