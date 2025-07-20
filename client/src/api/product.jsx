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
    // console.log("form api frontend", form) --> output as form api frontend with base64
    return await axios.post("/api/images", {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}