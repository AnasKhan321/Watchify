import { Bell, Search } from "lucide-react";
import Link from "next/link"
import GoogleClient from "./GoogleClient"

export default function Navbar(){





    return(
        <header className={`fixed top-0 z-50 w-full transition-all duration-500   bg-gradient-to-b from-black/80 to-transparent`}>
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


            <GoogleClient/> 
        </div>
      </header>
    )
}