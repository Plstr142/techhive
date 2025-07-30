import React, { useEffect, useState } from "react"
import { getOrdersAdmin } from "../../api/admin"
import usetechhiveStore from "../../store/techhive-store"

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

    return (
        <div className="container mx-auto p-4 bg-white rounded-sm">
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200 border border-gray-100">
                            <th>Index</th>
                            <th>Username</th>
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
                                        <td className="px-2 py-6">
                                            {
                                                item.products?.map((product, index) => (
                                                    <li key={index}>
                                                        {product.product.title} {"  "}
                                                        <span className="text-sm">{product.count} x {product.product.price}</span>
                                                    </li>
                                                ))
                                            }
                                        </td>
                                        <td>{item.cartTotal}</td>
                                        <td>{item.orderStatus}</td>
                                        <td>action</td>
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