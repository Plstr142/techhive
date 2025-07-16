import React, { useState } from "react"
// import axios from "axios"
import { toast } from 'react-toastify';
import usetechhiveStore from "../../store/techhive-store";

const Login = () => {
    const actionLogin = usetechhiveStore((state) => state.actionLogin);
    const user = usetechhiveStore((state) => state.user)

    console.log("user form zustand", user)
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        // console.log(e.target.name, e.target.value)

        // Call the operator's email, password, and confirm password to keep the old data intact and set key , value
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        // don't refresh
        e.preventDefault()

        // Send to backend
        try {
            const res = await actionLogin(form);

            // console.log(res.data)
            // toast.success(res.data)

            // console.log(res.data)
            toast.success("Welcome Back")
        } catch (error) {
            const errorMsg = error.response?.data?.message
            toast.error(errorMsg)
            console.log(error)
        }
    }

    return (
        <div>
            Log in
            <form onSubmit={handleSubmit}>
                Email:
                <input className="border rounded-sm"
                    name="email"
                    type="email"
                    onChange={handleOnChange} />
                Password:
                <input className="border rounded-sm"
                    name="password"
                    type="text"
                    onChange={handleOnChange}
                />
                <button className="bg-blue-500 rounded-sm">
                    Login
                </button>
            </form>
        </div>
    )
}
export default Login