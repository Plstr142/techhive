import axios from "axios"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { listCategory } from "../api/Category"
import { listProduct } from "../api/product"

// return as obj
const techhiveStore = (set) => ({
    user: null,
    token: null,
    categories: [],
    products: [],
    actionLogin: async (form) => {
        const res = await axios.post("/api/login", form)
        // console.log(res.data.token)
        // set data from db to state
        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    },
    // category data in getCategory
    getCategory: async (token) => {
        try {
            const res = await listCategory(token)
            set({ categories: res.data })
        } catch (error) {
            console.log(error)
        }
    },
    // category data getProduct
    getProduct: async (token, count) => {
        try {
            const res = await listProduct(token, count)
            set({ products: res.data })
        } catch (error) {
            console.log(error)
        }
    }
})

const usePersist = {
    name: "techhive-store",
    storage: createJSONStorage(() => localStorage)
}

const usetechhiveStore = create(persist(techhiveStore, usePersist))

export default usetechhiveStore