import React, { useEffect, useState } from "react"
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin"
import usetechhiveStore from "../../store/techhive-store"
import { toast } from "react-toastify"
import { numberFormat } from "../../utils/Number"
// import moment from "moment"
import { dateFormat } from "../../utils/dateformat"
// th
// import moment from "moment/min/moment-with-locales"

const TableOrders = () => {
    const token = usetechhiveStore((state) => state.token);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // code body
        handleGetOrder(token);
    }, [])

    const handleGetOrder = (token) => {
        getOrdersAdmin(token)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    const handleChangeOrderStatus = (token, orderId, orderStatus) => {
        console.log(orderId, orderStatus)
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res);
                toast.success("Update Status Successfully!");
                handleGetOrder(token)
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
        <div className="container mx-auto p-4 bg-white rounded-sm">
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200 border border-gray-100">
                            <th>Index</th>
                            <th>Username</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders?.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr key={index} className="border border-gray-100">
                                        <td className="text-center">{index + 1}</td>
                                        <td>
                                            <p>{item.orderedBy.email}</p>
                                            <p>{item.orderedBy.address}</p>
                                        </td>

                                        <td>
                                            {dateFormat(item.createdAt)}
                                            {/* th */}
                                            {/* {moment(item.createdAt).locale("th").format("LL")} */}
                                            {/* {dateFormat(item.createdAt)} */}
                                        </td>

                                        <td className="px-2 py-6">
                                            {
                                                item.products?.map((product, index) => (
                                                    <li key={index}>
                                                        {product.product.title} {"  "}
                                                        <span className="text-sm">{product.count} x {numberFormat(product.product.price)}</span>
                                                    </li>
                                                ))
                                            }
                                        </td>
                                        <td>{numberFormat(item.cartTotal)}</td>

                                        <td>
                                            <span className={`${getStatusColor(item.orderStatus)} px-2 py-2 rounded-full`}>
                                                {item.orderStatus}
                                            </span>
                                        </td>


                                        <td>
                                            <select
                                                value={item.orderStatus}
                                                onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                                            >
                                                <option>Not Process</option>
                                                <option>Processing</option>
                                                <option>Completed</option>
                                                <option>Cancel</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
export default TableOrders