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
import axios from "axios"





const WebSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be 500 characters or less'),
  videourl : z.string().url("must be valid url")
})

type WebFormValues = z.infer<typeof WebSchema>

export default function AddEpisode({id}  : {id : string}) {
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
      videourl : ''
    },
  })



  async function onSubmit(data: WebFormValues) {
    setIsSubmitting(true)
    try {






        const episodedata = {
            title : data.title , 
            description : data.description ,
            videourl : data.videourl , 
            webseriesId  : id
        }
        console.log(episodedata)


        await axios.post("/api/episode"  , episodedata, {
            headers : {
                "Content-type"  : "application/json"
            },
            
        })
        toast.success("Episode Added successfully")
            
        form.reset()
      
        return ; 
      




    } catch (error) {

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl  mx-auto bg-red-900/20 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Episode</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter episode title" {...field} className="bg-red-900/30 border-red-700 text-white" />
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
              name="videourl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VideUrl</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter video url" {...field} className="bg-red-900/30 border-red-700 text-white" />
                  </FormControl>
                  <FormDescription>
                    The title of the movie (max 100 characters).
                  </FormDescription>
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