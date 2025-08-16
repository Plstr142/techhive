import axios from "axios";

export const createUserCart = async (token, cart) => {
    return await axios.post("/api/user/cart", cart, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const listUserCart = async (token) => {
    return await axios.get("/api/user/cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const saveAddress = async (token, address) => {
    return await axios.post("/api/user/address", { address }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const saveOrder = async (token, payload) => {
    return await axios.post("/api/user/order", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const getOrders = async (token) => {
    return await axios.get("/api/user/order", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const listProfile = async (count = 2) => {
    return await axios.get("/api/profiles/" + count)
}

export const createProfile = async (token, data) => {
    return await axios.post("/api/createprofile", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const getProfile = async (token, userId) => {
    return await axios.get(`/api/profile/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

