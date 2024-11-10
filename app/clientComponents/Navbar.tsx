"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Search } from "lucide-react";
import {useState , useEffect }  from "react"
import { useSession, signIn, signOut } from 'next-auth/react';
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link"

import Image from "next/image"
export default function Navbar(){

    const [isScrolled, setIsScrolled] = useState(false)
    const { data: session } = useSession();
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0) {
            setIsScrolled(true)
          } else {
            setIsScrolled(false)
          }
        }
    
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, [])
    return(
        <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
        <div className="flex items-center space-x-2 md:space-x-10 h-16 px-4 md:px-8">
          <h1 className="text-2xl font-bold text-red-600">WATCHIFY</h1>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="header-link hover:text-red-600 transition-colors">Home</Link>
            <Link href="#" className="header-link hover:text-red-600 transition-colors">TV Shows</Link>
            <Link href="#" className="header-link hover:text-red-600 transition-colors">Movies</Link>
            <Link href="#" className="header-link hover:text-red-600 transition-colors">New & Popular</Link>
            <Link href="#" className="header-link hover:text-red-600 transition-colors">My List</Link>
          </nav>
          <div className="flex-1" />
          <Link href="/movie">
          <Search className="h-6 w-6 hover:text-red-600 transition-colors cursor-pointer" />
          
          </Link>
          <Bell className="h-6 w-6 hover:text-red-600 transition-colors cursor-pointer" />
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
                onClick={()=>{signIn()}}> Login </button>
            }
        </div>
      </header>
    )
}