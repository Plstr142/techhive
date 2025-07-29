import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import usetechhiveStore from "../store/techhive-store";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const token = usetechhiveStore((state) => state.token);

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

        console.log(payload)

        if (payload.error) {
            setMessage(error.message);
        } else {
            // Create Order
            saveOrder(token, payload)
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => {
                    console.log(error)
                })
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