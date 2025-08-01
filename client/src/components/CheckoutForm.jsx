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
                    toast.success("Payment could not be completed!")
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
        <form
            className="space-y-6"
            id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button
                className="stripe-button"
                disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}