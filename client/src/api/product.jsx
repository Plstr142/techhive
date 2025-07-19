import axios from "axios";

export const createProduct = async (token, form) => {
    return await axios.post("/api/product", form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const listProduct = async (token, count = 27) => {
    return await axios.get("/api/products/" + count, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const uploadFiles = async (token, form) => {
    return await axios.post("/api/images", form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

