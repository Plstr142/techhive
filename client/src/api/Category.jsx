import axios from "axios";

export const createCategory = async (token, form) => {
    // code body
    return axios.post("/api/category", form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
