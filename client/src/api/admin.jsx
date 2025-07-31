import axios from "axios"

export const getOrdersAdmin = async (token) => {
    // code body
    return axios.get("/api/admin/orders", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const changeOrderStatus = async (token, orderId, orderStatus) => {
    // code body
    return axios.put("/api/admin/order-status", {
        orderId, orderStatus
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const getListAllUsers = async (token) => {
    // code body
    return axios.get("/api/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}   