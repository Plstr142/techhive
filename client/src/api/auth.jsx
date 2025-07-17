import axios from "axios"

export const currentUser = (token) => axios.post("/api/current-user", {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

export const currentAdmin = (token) => {
    return axios.post("/api/current-admin", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};