import WebSeriesDetail from "@/app/clientComponents/WebDetail";
import axios from "axios"


export default async function Page({params}  : { params: Promise<{ id: string }>}){
    const parameters = await params ; 
    const {data }  = await  axios.get(`https://watchify-topaz.vercel.app/api/webseries/${parameters.id}`)
    console.log(data.data )
    return(
        <WebSeriesDetail webseries={data.data}/>
    )   

}