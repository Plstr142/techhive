import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import usetechhiveStore from "../store/techhive-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

export default function CheckoutForm() {
    const token = usetechhiveStore((state) => state.token);
    const clearCart = usetechhiveStore((state) => state.clearCart);

    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        // destructuring payload
        const payload = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });

        console.log("payload", payload)

        if (payload.error) {
            setMessage(payload.error.message);
            console.log("error")
            toast.error(payload.error.message)
        }
        else if (payload.paymentIntent.status === "succeeded") {
            console.log("Ready or Saveorder")
            // Create Order
            saveOrder(token, payload)
                .then((res) => {
                    console.log(res)
                    clearCart()
                    toast.success("Payment Successfully!")
                    navigate("/user/history")
                })
                .catch((error) => {
                    console.log(error)
                    toast.error("Payment could not be completed!")
                })
        }
        else {
            console.log("Something wrong!!!")
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                        Complete Payment
                    </h2>

                    <form
                        className="space-y-6"
                        id="payment-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="payment-element-container">
                            <PaymentElement
                                id="payment-element"
                                options={paymentElementOptions}
                            />
                        </div>

                        <button
                            className="w-full stripe-button py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center min-h-[48px]"
                            disabled={isLoading || !stripe || !elements}
                            id="submit"
                        >
                            <span id="button-text" className="flex items-center justify-center">
                                {isLoading ? (
                                    <div className="spinner border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" id="spinner"></div>
                                ) : (
                                    "Pay now"
                                )}
                            </span>
                        </button>

                        {/* Show any error or success messages */}
                        {message && (
                            <div
                                id="payment-message"
                                className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm break-words"
                            >
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}


// import React, { useState } from "react";
// import {
//     PaymentElement,
//     useStripe,
//     useElements
// } from "@stripe/react-stripe-js";
// import "../stripe.css";
// import { saveOrder } from "../api/user";
// import usetechhiveStore from "../store/techhive-store";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom"

// export default function CheckoutForm() {
//     const token = usetechhiveStore((state) => state.token);
//     const clearCart = usetechhiveStore((state) => state.clearCart);

//     const navigate = useNavigate();

//     const stripe = useStripe();
//     const elements = useElements();

//     const [message, setMessage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         setIsLoading(true);

//         // destructuring payload
//         const payload = await stripe.confirmPayment({
//             elements,
//             redirect: "if_required"
//         });

//         console.log("payload", payload)

//         if (payload.error) {
//             setMessage(payload.error.message);
//             console.log("error")
//             toast.error(payload.error.message)
//         }
//         else if (payload.paymentIntent.status === "succeeded") {
//             console.log("Ready or Saveorder")
//             // Create Order
//             saveOrder(token, payload)
//                 .then((res) => {
//                     console.log(res)
//                     clearCart()
//                     toast.success("Payment Successfully!")
//                     navigate("/user/history")
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                     toast.success("Payment could not be completed!")
//                 })
//         }
//         else {
//             console.log("Something wrong!!!")
//         }

//         setIsLoading(false);
//     };

//     const paymentElementOptions = {
//         layout: "accordion"
//     }

//     return (
//         <form
//             className="space-y-6"
//             id="payment-form" onSubmit={handleSubmit}>

//             <PaymentElement id="payment-element" options={paymentElementOptions} />
//             <button
//                 className="stripe-button"
//                 disabled={isLoading || !stripe || !elements} id="submit">
//                 <span id="button-text">
//                     {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//                 </span>
//             </button>
//             {/* Show any error or success messages */}
//             {message && <div id="payment-message">{message}</div>}
//         </form>
//     );
// }