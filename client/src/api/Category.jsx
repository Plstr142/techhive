import axios from "axios";

export const createCategory = async (token, form) => {
    // code body
    return axios.post("/api/category", form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const listCategory = async (token) => {
    // code body
    return axios.get("/api/category", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const removeCategory = async (token, id) => {
    // code body
    return axios.delete("/api/category/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
