import React, { useEffect, useState } from "react"
import usetechhiveStore from "../../store/techhive-store";

const SearchCard = () => {
    const getProduct = usetechhiveStore((state) => state.getProduct);
    const products = usetechhiveStore((state) => state.products);
    const actionSearchFilters = usetechhiveStore((state) => state.actionSearchFilters);


    const [text, setText] = useState("");
    // Step 1 Search Text
    console.log(text)

    useEffect(() => {
        const delay = setTimeout(() => {
            actionSearchFilters({ query: text })
            if (!text) {
                getProduct();
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [text])


    // Step 2 Search by Category

    // Step 3 Search by Price 

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Finding Product</h1>

            <input
                onChange={(e) => setText(e.target.value)}
                placeholder="Search for products, brands or categories"
                className="border rounded-md w-full mb-4"
                type="text"
            />
        </div>
    )
}
export default SearchCard