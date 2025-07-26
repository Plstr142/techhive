import axios from "axios";

export const createUserCart = async (token, cart) => {
    return await axios.post("/api/user/cart", cart, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
