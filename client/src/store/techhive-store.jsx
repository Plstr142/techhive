import axios from "axios"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// return as obj
const techhiveStore = (set) => ({
    user: null,
    token: null,
    actionLogin: async (form) => {
        const res = await axios.post("/api/login", form)
        // console.log(res.data.token)
        // set data from db to state
        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    }
})

const usePersist = {
    name: "techhive-store",
    storage: createJSONStorage(() => localStorage)
}

const usetechhiveStore = create(persist(techhiveStore, usePersist))

export default usetechhiveStore