import WebDetail from "@/app/clientComponents/WebDetail"
import {  Webseries } from "@/interfaces"


interface  WebSeriess{
    webseries : Webseries[]
}

interface WebDetails{
    data : Webseries
}

export const revalidate = 60*60*24
 
export const dynamicParams = true 
 
export async function generateStaticParams() {
  const response :WebSeriess  = await fetch('https://watchify-topaz.vercel.app/api/webseries').then((res) =>
    res.json()
  )
  const data  : Webseries[] = response.webseries
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
  const data: WebDetails = await fetch(`https://watchify-topaz.vercel.app/api/webseries/${id}`).then(
    (res) => res.json()
  )

    if(data.data==null){
        return (
            <div className="text-center font-bold text-2xl  mt-10 ">Web not found !</div>
        )
    }


    return(
        <WebDetail webseries={data.data}/>
    )
}