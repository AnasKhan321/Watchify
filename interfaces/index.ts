export interface User{
    id: string , 
    name: string ,
    email: string , 
    image: string
}

export interface Movie {
    
  id   : string ,
  title  : string ,
  description  : string,  
  imageurl   : string , 
  videourl   : string , 
  posterimageurl : string , 
  Quality : string , 
  createdAt  : string , 
  updatedAt  : string

}



export interface Webseries{
  id : string ,
  title   : string ,
  description  :  string, 
  imageurl : string   , 
  episodes   :  Episode[],
  createdAt  : string , 
  updatedAt  : string
}


export interface Episode {
  id   : string 
  title  : string , 
  description  : string ,
  videourl  : string , 
  webseriesId   : string , 
  createdAt   : string , 
  updatedAt  : string 
}