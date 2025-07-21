import axios from "axios";

export const createProduct = async (token, form) => {
    return await axios.post("/api/product", form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const listProduct = async (token, count = 100) => {
    return await axios.get("/api/products/" + count, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const readProduct = async (token, id) => {
    return await axios.get("/api/product/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const deleteProduct = async (token, id) => {
    return await axios.delete("/api/product/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const updateProduct = async (token, id, form) => {
    return await axios.put("/api/product/" + id, form, {
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

export const removeFiles = async (token, public_id) => {
    // console.log("form api frontend", form) --> output as form api frontend with base64
    return await axios.post("/api/removeimages", {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}