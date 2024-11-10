"use client"
import { useSession, signIn, signOut } from 'next-auth/react';

import AddMovieForm from "@/app/clientComponents/AddMovie"

export default function Page(){

    const {data : session}  = useSession()

    if(session){
        if(session.user?.email == process.env.NEXT_PUBLIC_AUTHOR_EMAIL ){
        
            return(
                <AddMovieForm/> 

            )
        }else{
            return(
                <div>You are not admin</div>
            )
        }

    }else{
        return(
            <div>You are not authorized</div>
        )
    }

}