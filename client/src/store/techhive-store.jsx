import axios from "axios"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { listCategory } from "../api/Category"
import { listProduct, searchFilters } from "../api/product"

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
    getCategory: async () => {
        try {
            const res = await listCategory()
            set({ categories: res.data })
        } catch (error) {
            console.log(error)
        }
    },
    // category data getProduct
    getProduct: async (count) => {
        try {
            const res = await listProduct(count)
            set({ products: res.data })
        } catch (error) {
            console.log(error)
        }
    },
    actionSearchFilters: async (arg) => {
        try {
            const res = await searchFilters(arg)
            set({ products: res.data })
        } catch (error) {
            console.log(error)
        }
    },
})

const usePersist = {
    name: "techhive-store",
    storage: createJSONStorage(() => localStorage)
}

const usetechhiveStore = create(persist(techhiveStore, usePersist))

export default usetechhiveStore