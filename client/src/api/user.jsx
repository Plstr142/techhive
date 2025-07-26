import axios from "axios";

export const createUserCart = async (token, cart) => {
    return await axios.post("/api/user/cart", cart, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const listUserCart = async (token) => {
    return await axios.get("/api/user/cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
