"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../globals.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Movie } from '@/interfaces';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';


export default function Slides({movies}  : {movies : Movie[]}) {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
        //@ts-ignore
  const onAutoplayTimeLeft = (s, time, progress) => {
    if(progressCircle !==null  && progressContent !==null){
      //@ts-ignore
      progressCircle.current.style.setProperty('--progress', 1 - progress);
            //@ts-ignore
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }

  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}

        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >

        {movies.map((movie)=> (
                <SwiperSlide key={movie.id}>
                        <section className="relative h-[80vh] md:h-[90vh]">
                        <div className="absolute inset-0 w-[100vw]">
                        <img
                            src={movie.posterimageurl}
                            alt="Featured movie"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 w-[100vw] bg-gradient-to-b from-transparent via-black/60 to-black" />
                        </div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 space-y-4 w-[200px]  md:w-[500px]">
                        <h2 className="text-2xl md:text-6xl font-bold">{movie.title.toUpperCase()}</h2>
                        <p className="text-sm md:text-xl">{movie.description.slice(0, 100 )}</p>
                        <div className="space-x-4">
                            <a href={`/movie/${movie.id}`}> 
                            

                            <Button size="lg" className="text-white bg-red-600 hover:bg-red-700">
                            <Play className="mr-2 h-5 w-5" /> Play
                            </Button>                            </a>

                        </div>
                        </div>
                    </section>
                </SwiperSlide>
  
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="10 10 148 148" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
