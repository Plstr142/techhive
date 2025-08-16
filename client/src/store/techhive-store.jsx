import axios from "axios"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { listCategory } from "../api/Category"
import { listProduct, searchFilters } from "../api/product"
import _ from "lodash"

// return as obj
const techhiveStore = (set, get) => ({
    user: null,
    token: null,
    profilename: null,
    categories: [],
    products: [],
    carts: [],
    logout: () => {
        set({
            user: null,
            token: null,
            categories: [],
            products: [],
            carts: [],
        })
    },
    actionAddtoCart: (product) => {
        const carts = get().carts
        const updateCart = [...carts, { ...product, count: 1 }];

        // Step Unique
        const unique = _.unionWith(updateCart, _.isEqual);
        // console.log("Click add in Zustand", updateCart)
        // console.log("unique", unique)
        set({ carts: unique })
    },
    actionUpdateQuantity: (productId, newQuantity) => {
        // console.log("Update Click", productId, newQuantity)
        set((state) => ({
            carts: state.carts.map((item) =>
                item.id === productId
                    ? { ...item, count: Math.max(1, newQuantity) }
                    : item
            )
        }));
    },
    actionRemoveProduct: (productId) => {
        // console.log("remove succesffully!", productId)
        set((state) => ({
            carts: state.carts.filter((item) =>
                item.id !== productId
            )
        }))
    },

    getTotalPrice: () => {
        return get().carts.reduce((total, item) => {
            return total + item.price * item.count;
        }, 0);
    },

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
    clearCart: () => set({ carts: [] }),
})

const usePersist = {
    name: "techhive-store",
    storage: createJSONStorage(() => localStorage)
}

const usetechhiveStore = create(persist(techhiveStore, usePersist))

export default usetechhiveStore