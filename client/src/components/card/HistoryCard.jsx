import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user"
import usetechhiveStore from "../../store/techhive-store"
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/Number";

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

    const getStatusColor = (status) => {
        switch (status) {
            case "Not Process":
                return "bg-gray-200"
            case "Processing":
                return "bg-blue-300"
            case "Completed":
                return "bg-green-200"
            case "Cancel":
                return "bg-red-200"
        }
    };

    return (
        <div className="space-y-4 mt-4 mb-4">
            <h1 className="text-2xl font-bold">Order Archive</h1>

            {/* cover table */}
            <div className="space-y-6">
                {/* Card loop order */}
                {
                    orders?.map((item, index) => {
                        // console.log(item)
                        return (
                            <div
                                key={index}
                                className="bg-gray-600 p-4 rounded-sm shadow-md">
                                {/* header */}
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <p className="text-md text-white">Order date</p>
                                        <p className="font-bold text-white">{dateFormat(item.updatedAt)}</p>
                                    </div>
                                    <div className="text-md text-white">
                                        <span className={`${getStatusColor(item.orderStatus)} px-2 py-2 rounded-full text-black`}>
                                            {item.orderStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* table loop product */}
                                <div>
                                    <table className="border border-gray-200 w-full">
                                        <thead>
                                            <tr className="bg-gray-200 text-black">
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
                                                        <tr key={index} className="text-white">
                                                            <td>{product.product.title}</td>
                                                            <td>{numberFormat(product.product.price)}</td>
                                                            <td>{product.count}</td>
                                                            <td>{numberFormat(product.count * product.product.price)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </table>
                                </div>

                                {/* total */}
                                <div>
                                    <div className="text-right m-4 text-white">
                                        <p className="font-bold">NET TOTAL</p>
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