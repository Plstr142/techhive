import axios from "axios";

export const createProduct = async (token, form) => {
    return await axios.post("/api/product", form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const listProduct = async (token, count = 21) => {
    return await axios.get("/api/products/" + count, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

