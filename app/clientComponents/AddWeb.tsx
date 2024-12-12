'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import toast  from "react-hot-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Upload } from 'lucide-react'
import axios from "axios"
import { headers } from 'next/headers'



const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"]

const WebSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be 500 characters or less'),
  image: z.any().optional(),
})

type WebFormValues = z.infer<typeof WebSchema>

export default function AddWeb() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [imageUrl , setimageUrl]  = useState<string | null > (null)
  const [imageuploading , setimageuploading]  = useState(false)

  const form = useForm<WebFormValues>({
    resolver: zodResolver(WebSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
    },
  })

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
    setimageuploading(true)

    const file = event.target.files?.[0]

    try {
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
              setFileError("File size should be less than 5MB")
              return
            }
            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
              setFileError("Only .jpg, .jpeg, .png and .webp files are accepted")
              return
            }
      
            const {data}  = await axios.post("/api/getsignedUrl"  , {
              imageName : file.name , 
              imageType : file.type
            })
      
            await axios.put(data.url , file  , {
              headers: {
                  "Content-Type": file.type,
                },
            })
      
            const url = new URL(data.url);
            const myfilepath = `${url.origin}${url.pathname}`;
            setimageUrl(myfilepath);
            setPreviewImage(URL.createObjectURL(file))
            setFileError(null)
      
      
            toast.success("Thumbnail Image uploaded")
            onChange(file)
   
          }
        
    } catch (error) {
        toast.error("something went wrong ")
    }finally{
        setimageuploading(false)
    }

  }



  async function onSubmit(data: WebFormValues) {
    setIsSubmitting(true)
    try {


        if(imageUrl ){



            const movieData = {
                title : data.title , 
                description : data.description ,
                imageurl : imageUrl   , 
            }


            await axios.post("/api/webseries"  , movieData, {
                headers : {
                    "Content-type"  : "application/json"
                },
              
            })
            toast.success("Web Series added Successfully")
                    
              form.reset()
              setPreviewImage(null)
              return ; 
        }
        else{
            toast.error("Upload an image ")
        }




    } catch (error) {

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl  mx-auto bg-red-900/20 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Web Series</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter movie title" {...field} className="bg-red-900/30 border-red-700 text-white" />
                  </FormControl>
                  <FormDescription>
                    The title of the movie (max 100 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter movie description" 
                      {...field} 
                      className="bg-red-900/30 border-red-700 text-white min-h-[100px]" 
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of the movie (10-500 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
 
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Upload a Thumbnail Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-red-700 border-dashed rounded-lg cursor-pointer bg-red-900/30 hover:bg-red-900/50">
                        {previewImage ? (
                          <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-red-500" />
                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-400">PNG, JPG or WEBP (MAX. 5MB)</p>
                          </div>
                        )}
                        <input 
                          id="dropzone-file" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, onChange)}
                          {...rest}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a movie   thumbnail image.
                  </FormDescription>
                  {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                  <FormMessage />
                </FormItem>
              )}
            />







            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Web series'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}