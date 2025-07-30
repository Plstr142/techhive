import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user"
import usetechhiveStore from "../../store/techhive-store"

const HistoryCard = () => {
    const token = usetechhiveStore((state) => state.token);
    // console.log(token)
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        handleGetOrders(token)
    }, [])

    const handleGetOrders = (token) => {
        getOrders(token)
            .then((res) => {
                // console.log(res)
                setOrders(res.data.orders)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Order Archive</h1>

            {/* cover table */}
            <div className="space-y-4">
                {/* Card loop order */}
                {
                    orders?.map((item, index) => {
                        // console.log(item)
                        return (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded-sm shadow-md">
                                {/* header */}
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-md">Order date</p>
                                        <p className="font-bold">{item.updatedAt}</p>
                                    </div>
                                    <div className="text-md">
                                        {item.orderStatus}
                                    </div>
                                </div>

                                {/* table loop product */}
                                <div>
                                    <table className="border border-gray-200 w-full">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th>PRODUCT</th>
                                                <th>PRICE</th>
                                                <th>QUANTITY</th>
                                                <th>TOTAL</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                item.products?.map((product, index) => {
                                                    // console.log(product)
                                                    return (
                                                        <tr key={index}>
                                                            <td>{product.product.title}</td>
                                                            <td>{product.product.price}</td>
                                                            <td>{product.count}</td>
                                                            <td>{product.count * product.product.price}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </table>
                                </div>

                                {/* total */}
                                <div>
                                    <div className="text-right">
                                        <p>NET TOTAL</p>
                                        <p>{item.cartTotal}</p>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </div >
    )
}
export default HistoryCard