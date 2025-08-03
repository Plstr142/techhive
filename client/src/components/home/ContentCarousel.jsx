import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";



const ContentCarousel = () => {
    // Javascript
    const [data, setData] = useState([]);
    useEffect(() => {
        hdlGetImage();
    }, []);

    const hdlGetImage = () => {
        // code
        axios
            .get("https://picsum.photos/v2/list?page=1&limit=20")
            .then((res) => setData(res.data))
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <Swiper
                pagination={true}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="mySwiper h-80 object-cover mb-4"
            >
                {data?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.download_url} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="p-4">
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
                    className="mySwiper object-cover rounded-md"
                >
                    {data?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img
                                className="rounded-sm"
                                src={item.download_url} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    );
};

export default ContentCarousel;






// import React, { useState, useEffect } from "react";

// const ContentCarousel = () => {
//     const [data, setData] = useState([]);
//     const [currentSlide1, setCurrentSlide1] = useState(0);
//     const [currentSlide2, setCurrentSlide2] = useState(0);
//     const [currentSlide3, setCurrentSlide3] = useState(0);

//     useEffect(() => {
//         const generateSampleData = () => {
//             const sampleData = [];
//             for (let i = 1; i <= 14; i++) {
//                 sampleData.push({
//                     id: i,
//                     download_url: `https://picsum.photos/800/600?random=${i}`,
//                     author: `Author ${i}`
//                 });
//             }
//             return sampleData;
//         };

//         setData(generateSampleData());
//     }, []);

//     useEffect(() => {
//         const interval1 = setInterval(() => {
//             setCurrentSlide1(prev => (prev + 1) % data.length);
//         }, 2500);

//         const interval2 = setInterval(() => {
//             setCurrentSlide2(prev => (prev + 1) % Math.ceil(data.length / 5));
//         }, 2500);

//         const interval3 = setInterval(() => {
//             setCurrentSlide3(prev => (prev + 1) % data.length);
//         }, 2500);

//         return () => {
//             clearInterval(interval1);
//             clearInterval(interval2);
//             clearInterval(interval3);
//         };
//     }, [data.length]);

//     const nextSlide = (slideState, setSlideState, maxSlides) => {
//         setSlideState(prev => (prev + 1) % maxSlides);
//     };

//     const prevSlide = (slideState, setSlideState, maxSlides) => {
//         setSlideState(prev => (prev - 1 + maxSlides) % maxSlides);
//     };

//     const goToSlide = (slideIndex, setSlideState) => {
//         setSlideState(slideIndex);
//     };

//     const PaginationDots = ({ totalSlides, currentSlide, onDotClick }) => (
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//                 <button
//                     key={index}
//                     onClick={() => onDotClick(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white' : 'bg-black bg-opacity-60'
//                         }`}
//                 />
//             ))}
//         </div>
//     );

//     const NavigationButton = ({ direction, onClick, className = "" }) => (
//         <button
//             onClick={onClick}
//             className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${className}`}
//         >
//             {direction === 'next' ? (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//             ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//             )}
//         </button>
//     );

//     if (data.length === 0) {
//         return <div className="flex justify-center items-center h-80">Loading...</div>;
//     }

//     return (
//         <div className="w-full">
//             <div className="relative h-80 overflow-hidden">
//                 <div
//                     className="flex transition-transform duration-500 ease-in-out h-full"
//                     style={{ transform: `translateX(-${currentSlide1 * 100}%)` }}
//                 >
//                     {data.map((item, index) => (
//                         <div key={index} className="w-full h-full flex-shrink-0">
//                             <img
//                                 src={item.download_url}
//                                 alt={`Slide ${index + 1}`}
//                                 className="h-full w-full object-cover"
//                             />
//                         </div>
//                     ))}
//                 </div>
//                 <PaginationDots
//                     totalSlides={data.length}
//                     currentSlide={currentSlide1}
//                     onDotClick={(index) => goToSlide(index, setCurrentSlide1)}
//                 />
//             </div>

//             <div className="p-4">
//                 <div className="relative overflow-hidden rounded-sm bg-white mt-8">
//                     <div
//                         className="flex transition-transform duration-500 ease-in-out"
//                         style={{ transform: `translateX(-${currentSlide2 * 100}%)` }}
//                     >
//                         {Array.from({ length: Math.ceil(data.length / 5) }).map((_, slideIndex) => (
//                             <div key={slideIndex} className="w-full flex-shrink-0 flex space-x-2 p-2">
//                                 {data.slice(slideIndex * 5, (slideIndex + 1) * 5).map((item, index) => (
//                                     <div key={index} className="flex-1">
//                                         <img
//                                             src={item.download_url}
//                                             alt={`Slide ${slideIndex * 5 + index + 1}`}
//                                             className="rounded-sm h-80 w-full object-cover"
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         ))}
//                     </div>

//                     <NavigationButton
//                         direction="prev"
//                         onClick={() => prevSlide(currentSlide2, setCurrentSlide2, Math.ceil(data.length / 5))}
//                         className="left-4"
//                     />
//                     <NavigationButton
//                         direction="next"
//                         onClick={() => nextSlide(currentSlide2, setCurrentSlide2, Math.ceil(data.length / 5))}
//                         className="right-4"
//                     />

//                     <PaginationDots
//                         totalSlides={Math.ceil(data.length / 5)}
//                         currentSlide={currentSlide2}
//                         onDotClick={(index) => goToSlide(index, setCurrentSlide2)}
//                     />
//                 </div>
//             </div>

//             <div className="p-4">
//                 <div className="relative h-80 overflow-hidden rounded-sm">
//                     <div
//                         className="flex transition-transform duration-500 ease-in-out h-full"
//                         style={{ transform: `translateX(-${currentSlide3 * 100}%)` }}
//                     >
//                         {data.map((item, index) => (
//                             <div key={index} className="w-full h-full flex-shrink-0">
//                                 <img
//                                     src={item.download_url}
//                                     alt={`Slide ${index + 1}`}
//                                     className="h-full w-full object-cover"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                     <PaginationDots
//                         totalSlides={data.length}
//                         currentSlide={currentSlide3}
//                         onDotClick={(index) => goToSlide(index, setCurrentSlide3)}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContentCarousel;





































// import React, { useState, useEffect } from "react"
// import { Swiper, SwiperSlide } from 'swiper/react';
// import axios from "axios"

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // import required modules
// import { Pagination, Autoplay, Navigation } from 'swiper/modules';


// const ContentCarousel = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         handleImage()
//     }, [])

//     const handleImage = async () => {
//         await axios.get("https://picsum.photos/v2/list?page=1&limit=14")
//             .then((res) => {
//                 setData(res.data)
//                 console.log(res)
//             })

//             .catch((error) => console.log(error))
//     };

//     return (
//         <div>
//             <Swiper
//                 pagination={true}
//                 modules={[Pagination, Autoplay]}
//                 className="mySwiper h-80 object-cover"
//                 autoplay={{
//                     delay: 2500,
//                     disableOnInteraction: false,
//                 }}
//             >
//                 {
//                     data?.map((item, index) =>
//                         <SwiperSlide>
//                             <img src={item.download_url} />
//                         </SwiperSlide>
//                     )
//                 }
//             </Swiper>

//             <div className="p-4">
//                 <Swiper
//                     slidesPerView={5}
//                     spaceBetween={10}
//                     pagination={true}
//                     modules={[Pagination, Autoplay, Navigation]}
//                     className="mySwiper object-cover mt-35 rounded-sm bg-white"
//                     navigation={true}
//                     autoplay={{
//                         delay: 2500,
//                         disableOnInteraction: false,
//                     }}
//                 >
//                     {
//                         data?.map((item, index) =>
//                             <SwiperSlide>
//                                 <img src={item.download_url} className="rounded-sm h-80 w-100" />
//                             </SwiperSlide>
//                         )
//                     }
//                 </Swiper>
//             </div>


//             <div className="p-4">
//                 <Swiper
//                     pagination={true} modules={[Pagination, Autoplay]} className="mySwiper h-80 object-cover rounded-sm"
//                     autoplay={{
//                         delay: 2500,
//                         disableOnInteraction: false,
//                     }}
//                 >
//                     {
//                         data?.map((item, index) =>
//                             <SwiperSlide>
//                                 <img src={item.download_url} />
//                             </SwiperSlide>
//                         )
//                     }
//                 </Swiper>
//             </div>
//         </div>
//     )
// }
// export default ContentCarousel

