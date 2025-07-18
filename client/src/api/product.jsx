import axios from "axios";

export const createProduct = async (token, form) => {
    return axios.post("/api/category", form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

