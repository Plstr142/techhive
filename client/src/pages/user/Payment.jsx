import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import usetechhiveStore from "../../store/techhive-store";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51RpRHFA9LCJokWWUGGJZ4bHYXNvRCn3ua62wzydLdbakSg02btFpGWbzzzklwcZcKTGgPDLOT5lu4i7jTsNjP94q00FFI6gi6w");

const Payment = () => {
    const token = usetechhiveStore((state) => state.token);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        payment(token)
            .then((res) => {
                console.log(res)
                setClientSecret(res.data.clientSecret)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    return (
        <div>
            {
                clientSecret && (
                    <Elements
                        options={{ clientSecret, appearance, loader }}
                        stripe={stripePromise}
                    >
                        <CheckoutForm />
                    </Elements>
                )
            }
        </div>
    )
}
export default Payment