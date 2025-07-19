import axios from "axios";

export const createProduct = async (token, form) => {
    return axios.post("/api/product", form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const listProduct = async (token, count = 20) => {
    return axios.get("/api/products/" + count, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

