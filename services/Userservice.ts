import { prisma } from "@/clients/prismaclient";


//user-service
export class UserService {
    

    public static async CheckUser(email  : string){
        const user = await prisma.user.findUnique({where : {email : email}})
        return user ; 
    }

    public static async Createuser(email : string , image : string , name : string){
        await prisma.user.create({
            data : {
                email : email , 
                name : name , 
                profileImageUrl : image
            }
          })

        return true ; 
    }
}