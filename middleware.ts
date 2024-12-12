import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/addMovie", "/admin"  , "/addEpisode" , "/addWeb"]

console.log(protectedRoutes)

export default auth((req   : any ) => {
  const isLoggedIn = !!req.auth
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  )



  if (isProtectedRoute && !isLoggedIn) {

    return NextResponse.redirect(new URL("/", req.url))
  }

  if(isProtectedRoute && isLoggedIn){
    if(req.auth.user.email == process.env.NEXT_PUBLIC_AUTHOR_EMAIL){
        return NextResponse.next() 
    }else{
        return NextResponse.redirect(new URL("/", req.url))  
    }
  }




  return NextResponse.next()
})

// This line configures which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}