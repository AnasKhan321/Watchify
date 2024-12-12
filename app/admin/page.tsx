import Link from "next/link"

export default function Page(){

    return(
        <div className="min-h-screen flex justify-center items-center flex-col gap-y-3 ">
            <button className='px-4 py-2 bg-transparent  border-2 border-red-500 text-red-500 hover:text-white  hover:bg-red-700 transition-all rounded-md  '
             >  <Link href="/addMovie"> Add Movie </Link> </button>
                         <button className='px-4 py-2 bg-transparent  border-2 border-red-500 text-red-500 hover:text-white  hover:bg-red-700 transition-all rounded-md  '
             >  <Link href="/addWeb"> Add Web Series </Link> </button>


<button className='px-4 py-2 bg-transparent  border-2 border-red-500 text-red-500 hover:text-white  hover:bg-red-700 transition-all rounded-md  '
             >  <Link href="/addEpisode"> Add Episode </Link> </button>
        </div>
    )


}