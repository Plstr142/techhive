import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const SwiperShowProduct = ({ children }) => {
    return (
        <Swiper
            slidesPerView={5}
            spaceBetween={10}
            pagination={true}
            navigation={true}
            modules={[Pagination, Autoplay, Navigation]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                375: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                },
                425: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
                1920: {
                    slidesPerView: 6,
                    spaceBetween: 50,
                },
            }}
            className="mySwiper object-cover rounded-sm"
        >
            {children}
        </Swiper>
    );
};

export default SwiperShowProduct;
