import axios from "axios";


// export const listProfile = async (count = 100) => {
//     return await axios.get("/api/profile/" + count)
// }

export const createProfile = async (token, form) => {
    return await axios.get("/api/profile/" + form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const updateProfile = async (token, id, form) => {
    return await axios.put("/api/profile/" + id, form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const listProfile = async (count = 2) => {
    return await axios.get("/api/profiles/" + count)
}


export const readProfile = async (token, id) => {
    return await axios.get("/api/profile/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const deleteProfile = async (token, id) => {
    return await axios.delete("/api/profile/" + id, {
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



