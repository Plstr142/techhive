import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // code
        loadData();
    }, []);

    const loadData = () => {
        listProductBy("sold", "desc", 12)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(data);

    return (
        <div className="p-11 justify-center bg-[#d8d8cb]">
            <SwiperShowProduct>
                {data?.map((item, index) => (
                    <SwiperSlide>
                        <ProductCard item={item} key={index} />
                    </SwiperSlide>
                ))}
            </SwiperShowProduct>
        </div>
    );
};

export default BestSeller;
