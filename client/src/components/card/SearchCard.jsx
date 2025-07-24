import React, { useEffect, useState } from "react"
import usetechhiveStore from "../../store/techhive-store";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchCard = () => {
    const getProduct = usetechhiveStore((state) => state.getProduct);
    const products = usetechhiveStore((state) => state.products);
    const actionSearchFilters = usetechhiveStore((state) => state.actionSearchFilters);

    const getCategory = usetechhiveStore((state) => state.getCategory);
    const categories = usetechhiveStore((state) => state.categories);

    const [text, setText] = useState("");
    const [categorySelected, setCategorySelected] = useState([]);

    const [price, setPrice] = useState([1000, 30000]);
    const [ok, setOk] = useState(false);

    // console.log(categories)
    useEffect(() => {
        getCategory();
    }, [])


    // Step 1 Search Text
    // console.log(text)

    useEffect(() => {
        const delay = setTimeout(() => {

            if (text) {
                actionSearchFilters({ query: text });
            } else {
                getProduct();
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [text])


    // Step 2 Search by Category
    const handleCheck = (e) => {
        // console.log(e.target.value)
        const inCheck = e.target.value // value on checked or unchecked 
        const inState = [...categorySelected] // [] array
        const findCheck = inState.indexOf(inCheck) // If not found, return -1.

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCategorySelected(inState)


        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }
    };

    console.log(categorySelected)

    // Step 3 Search by Price 
    useEffect(() => {
        actionSearchFilters({ price })
        // ok dependency
    }, [ok])

    const handlePrice = (value) => {
        console.log(value)
        setPrice(value)

        setTimeout(() => {
            // set ok dependency   
            setOk(!ok)
        }, 300)
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Finding Product</h1>
            {/* Search by Text */}
            <input
                onChange={(e) => setText(e.target.value)}
                placeholder="Search for products, brands or categories"
                className="border border-gray-300 p-1 rounded-md w-full mb-4"
                type="text"
            />
            <hr />
            {/* Search by Category */}
            <div>
                <h1 className="">Category Product</h1>
                <div>
                    {
                        categories.map((item, index) =>
                            <div className="flex flex-row gap-2" key={index}>
                                <input
                                    onChange={handleCheck}
                                    value={item.id}
                                    type="checkbox" />
                                <label>{item.name}</label>
                            </div>
                        )
                    }
                </div>
            </div>

            <hr />

            {/* Search by Price */}
            <div>
                <h1>Finding Price</h1>
                <div>
                    <div className="flex justify-between">
                        <span>Min : {price[0]}</span>
                        <span>Max : {price[1]}</span>
                    </div>

                    <Slider
                        onChange={handlePrice}
                        className="slider bg-gray-100"
                        range
                        min={0}
                        max={100000}
                        defaultValue={[1000, 1000000]}
                    />
                </div>
            </div>

        </div>
    )
}
export default SearchCard