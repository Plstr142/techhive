import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user"
import usetechhiveStore from "../../store/techhive-store"
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";

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
            default:
                return "bg-gray-200"
        }
    };

    return (
        <div className="w-full min-h-screen">
            <div className="space-y-4 mt-2 mb-2 px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-xl sm:text-2xl font-bold">Order Archive</h1>

                {/* cover table */}
                <div className="space-y-4 sm:space-y-6">
                    {/* Card loop order */}
                    {
                        orders?.map((item, index) => {
                            // console.log(item)
                            return (
                                <div
                                    key={index}
                                    className="bg-black p-2 sm:p-3 md:p-4 lg:p-6 rounded-sm shadow-md w-full">
                                    {/* header */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm sm:text-md text-white">Order date</p>
                                            <p className="font-bold text-white text-sm sm:text-base break-words">
                                                {dateFormat(item.updatedAt)}
                                            </p>
                                        </div>
                                        <div className="text-sm sm:text-md text-white shrink-0">
                                            <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 sm:px-3 sm:py-2 rounded-full text-black text-xs sm:text-sm font-medium whitespace-nowrap`}>
                                                {item.orderStatus}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Table with horizontal scroll for all screen sizes */}
                                    <div className="w-full overflow-x-auto">
                                        <div className="min-w-[500px]">
                                            <table className="border border-gray-200 w-full table-fixed">
                                                <colgroup>
                                                    <col className="w-2/5" />
                                                    <col className="w-1/5" />
                                                    <col className="w-1/5" />
                                                    <col className="w-1/5" />
                                                </colgroup>
                                                <thead>
                                                    <tr className="bg-gray-200 text-black">
                                                        <th className="px-1 sm:px-2 py-2 text-left text-xs sm:text-sm font-semibold border-r border-gray-300">
                                                            PRODUCT
                                                        </th>
                                                        <th className="px-1 sm:px-2 py-2 text-right text-xs sm:text-sm font-semibold border-r border-gray-300">
                                                            PRICE
                                                        </th>
                                                        <th className="px-1 sm:px-2 py-2 text-center text-xs sm:text-sm font-semibold border-r border-gray-300">
                                                            QTY
                                                        </th>
                                                        <th className="px-1 sm:px-2 py-2 text-right text-xs sm:text-sm font-semibold">
                                                            TOTAL
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        item.products?.map((product, index) => {
                                                            // console.log(product)
                                                            return (
                                                                <tr key={index} className="text-white border-b border-gray-400">
                                                                    <td className="px-1 sm:px-2 py-2 text-xs sm:text-sm border-r border-gray-400 overflow-hidden">
                                                                        <div className="break-words overflow-wrap-anywhere leading-tight" title={product.product.title}>
                                                                            {product.product.title}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-1 sm:px-2 py-2 text-right text-xs sm:text-sm border-r border-gray-400">
                                                                        <div className="truncate" title={numberFormat(product.product.price)}>
                                                                            {numberFormat(product.product.price)}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-1 sm:px-2 py-2 text-center text-xs sm:text-sm border-r border-gray-400">
                                                                        <div className="truncate" title={product.count}>
                                                                            {product.count}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-1 sm:px-2 py-2 text-right text-xs sm:text-sm font-medium">
                                                                        <div className="truncate" title={numberFormat(product.count * product.product.price)}>
                                                                            {numberFormat(product.count * product.product.price)}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Scroll hint for mobile */}
                                    <div className="sm:hidden mt-2 text-center">
                                        <p className="text-xs text-gray-300">← Swipe to see all columns →</p>
                                    </div>

                                    {/* total */}
                                    <div className="border-t border-gray-400 mt-3 sm:mt-4 pt-3 sm:pt-4">
                                        <div className="text-right text-white">
                                            <p className="font-bold text-sm sm:text-base">NET TOTAL</p>
                                            <p className="text-base sm:text-lg md:text-xl font-bold text-green-300 break-words" title={numberFormat(item.cartTotal)}>
                                                {numberFormat(item.cartTotal)}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                    {/* Empty State */}
                    {orders.length === 0 && (
                        <div className="text-center py-8 px-4 text-gray-500">
                            <p className="text-lg">No orders found</p>
                            <p className="text-sm">Your order history will appear here</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default HistoryCard