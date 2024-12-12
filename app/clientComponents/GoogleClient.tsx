"use client" 

import { Avatar } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSession   , signIn , signOut} from 'next-auth/react';
import Image from "next/image"
import Link from 'next/link';
export default function GoogleClient(){

    const { data: session } = useSession();
    return(
        <>

{session && 
            <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-red-600 transition-all">
  
                {session.user?.image && 
                <div>  
                  
                <Image src={session.user.image} width={50}  height={50}  alt="User image " />
                  
                    </div>}
      
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[100px] bg-red-900 text-white border-red-700">
              <DropdownMenuItem className="hover:bg-red-800">{session.user?.name}</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-red-800">Settings</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-red-800" onClick={()=>{signOut()}}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            </div>
    }
            {
                !session && <button className='px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-all rounded-md  '
                onClick={()=>{signIn("google")}}> Login </button>
            }

            {session?.user?.email == process.env.NEXT_PUBLIC_AUTHOR_EMAIL  &&  <button className='px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-all rounded-md  '
                onClick={()=>{}}>  <Link href="/admin"> Admin </Link> </button>}
        
        
        </>
    )
}