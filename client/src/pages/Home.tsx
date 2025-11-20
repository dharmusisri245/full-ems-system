"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Marquee from "react-fast-marquee";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">

      {/* ============================
            🔵 MARQUEE SECTION
        ============================ */}
      <div className=" text-zinc-500 py-3 overflow-hidden whitespace-nowrap h-6 items-center flex">
        <Marquee
          speed={80}
          pauseOnHover={true}
          gradient={false}
          className="text-lg font-semibold tracking-wide"
        >
          All Type Event Management Facilities Availble Here • Welcome to Event Management System •
        </Marquee>
      </div>

      {/* ============================
             AMAZON-STYLE SLIDER
        ============================ */}
      <div className="w-full mt-">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 3000, // Auto-slide like Amazon
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {[
              "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg",
              "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg",
              "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
              "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg",
            ].map((img, i) => (
              <CarouselItem key={i} className="w-full">
                <div className="w-full">
                  {/* <img
                    src={img}
                    className="w-full h-[300px] md:h-[380px] object-cover shadow-md"
                    alt={`banner-${i}`}
                  /> */}

                  <img
                    src={img}
                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] object-fill shadow-md"
                    alt={`banner-${i}`}
                  />

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Slider Arrows */}
          <CarouselPrevious className="left-3 bg-white/60 hover:bg-white text-black" />
          <CarouselNext className="right-3 bg-white/60 hover:bg-white text-black" />
        </Carousel>
      </div>
      {/* ============================
            🔵 STATIC PRODUCT ITEMS
        ============================ */}
      <div className="px-5 mt-10">
        <h2 className="text-2xl font-bold mb-5">Event Management Services</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { img: "/images/hotel.jpg", title: "Hotel Booking" },
            { img: "/images/lawn.jpg", title: "Lawn Booking" },
            { img: "/images/tent.jpg", title: "Tent & Decoration" },
            { img: "/images/sound.jpg", title: "Sound System" },
            { img: "/images/vehicle.jpg", title: "Event Vehicles" },
            { img: "/images/online-booking.jpg", title: "Online Booking" },
            { img: "/images/catering.jpg", title: "Catering Services" },
            { img: "/images/stage.jpg", title: "Stage Decoration" },
          ].map((item, index) => (
            <Card
              key={index}
              className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition"
            >
              <CardHeader className="p-0">
                <img
                  src={item.img}
                  className="h-32 w-full object-cover rounded-t-xl"
                />
              </CardHeader>

              <CardContent className="p-3">
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
