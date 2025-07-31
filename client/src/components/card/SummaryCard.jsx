import React, { useState, useEffect } from "react";
import usetechhiveStore from "../../store/techhive-store";
import { listUserCart, saveAddress } from "../../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/Number";

const SummaryCard = () => {
    const token = usetechhiveStore((state) => state.token);
    const [products, setProducts] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        handleGetUserCart(token);
    }, [])

    const handleGetUserCart = (token) => {
        listUserCart(token)
            .then((res) => {
                // console.log(res)
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    const handleSaveAddress = () => {
        console.log(address)
        if (!address) {
            return toast.warning("Please fill address");
        }
        saveAddress(token, address)
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                setAddressSaved(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleGoToPayment = () => {
        if (!addressSaved) {
            return toast.warning("Please fill address")
        }
        navigate("/user/payment");
    };

    console.log(products)

    return (
        <div className="mx-auto">
            <div className="flex flex-warp gap-4">
                {/* Left */}
                <div className="w-2/4">
                    <div className="bg-gray-100 p-4 rounded-sm 
                    border border-gray-100 shadow-md space-y-4">
                        <h1 className="font-bold text-xl">Address</h1>
                        <textarea
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Please fill your address"
                            className="w-full px-2 bg-white rounded-sm" />
                        <button
                            onClick={handleSaveAddress}
                            className="bg-black text-white px-4 py-2 rounded-sm hover:duration-100 hover:scale-101">
                            Save Address
                        </button>
                    </div>
                </div>

                {/* Right */}
                <div className="w-2/4">
                    <div
                        className="bg-gray-100 p-4 rounded-sm 
                    border border-gray-100 shadow-md space-y-4">
                        <h1 className="text-lg font-bold s">Your Order</h1>

                        {/* Item List */}

                        {
                            products?.map((item, index) =>
                                <div key={index}>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="font-bold">{item.product.title}</p>
                                            <p className="text-sm">Quantity : {item.count} x {numberFormat(item.product.price)}</p>
                                        </div>

                                        <div>
                                            <p className="text-black font-bold">
                                                {numberFormat(item.count * item.product.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                        <div>
                            <div className="flex justify-between">
                                <p>Price Address : </p>
                                <p>0.00</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Coupon Code : </p>
                                <p>0.00</p>
                            </div>
                        </div>

                        <hr className="text-gray-200" />
                        <div>
                            <div className="flex justify-between">
                                <p className="font-bold">Net Total : </p>
                                <p className="text-black font-bold text-lg">{numberFormat(cartTotal)}</p>
                            </div>
                        </div>

                        <hr className="text-gray-200" />
                        <div>
                            <button
                                onClick={handleGoToPayment}
                                // disabled={!addressSaved}
                                className="bg-black text-white p-2 w-45 rounded-md hover:duration-100 hover:scale-101">
                                Proceed with payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SummaryCard