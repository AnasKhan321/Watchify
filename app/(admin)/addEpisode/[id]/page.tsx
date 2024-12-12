import AddEpisode from "@/app/clientComponents/AddEpisode"
export default async function Page({params}  : { params: Promise<{ id: string }>}){
    const id = (await params).id
    const res = await fetch(`http://localhost:3000/api/webseries/${id}`)
    const data = await res.json() 
    if(data.data  == null){
        console.log("web series not available ")
        return(
            <div className="font-bold text-xl text-center mt-10 ">Enter Correct Id</div>
        )
    }
    return(
        <AddEpisode  id={id}/>
    )
}