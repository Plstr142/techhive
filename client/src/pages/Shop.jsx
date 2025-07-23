import React, { useEffect } from "react";
import ProductCard from "../components/card/ProductCard"
import usetechhiveStore from "../store/techhive-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";

const Shop = () => {
    // zustand Global state
    const getProduct = usetechhiveStore((state) => state.getProduct);
    const products = usetechhiveStore((state) => state.products);

    useEffect(() => {
        getProduct(9)
    }, [])

    return (
        <div className="flex">
            {/* Search Bar */}
            <div className="w-1/4 p-4 bg-gray-100 h-screen">
                <SearchCard />
            </div>

            {/* Product */}
            <div className="w-1/2 p-4 h-screen overflow-y-auto">
                <p className="text-2xl font-bold mb-4">All Product</p>
                <div className="flex flex-row flex-wrap gap-4 justify-center">
                    {/* Product Card */}
                    {
                        products.map((item, index) =>
                            <ProductCard key={index} item={item} />
                        )
                    }

                    {/* Product Card */}
                </div>
            </div>

            {/* Cart */}
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
                <CartCard />
            </div>
        </div>
    )
}
export default Shop