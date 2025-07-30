import axios from "axios"

export const getOrdersAdmin = async (token) => {
    // code body
    return axios.get("/api/admin/orders", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}