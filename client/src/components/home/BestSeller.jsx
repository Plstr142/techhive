import React, { useEffect, useState } from "react"
import { listProductBy } from "../../api/product"
import ProductCard from "../card/ProductCard"

const BestSeller = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy("sold", "desc", 4)
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    console.log(data)

    return (
        <div className="flex flex-row flex-wrap justify-center p-10 bg-gray-100 gap-4">
            {
                data?.map((item, index) =>
                    <ProductCard item={item} key={index} />
                )
            }
        </div >
    )
}
export default BestSeller