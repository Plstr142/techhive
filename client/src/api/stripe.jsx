import axios from "axios"

export const payment = async (token) => await axios.post("/api/user/create-payment-intent", {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);