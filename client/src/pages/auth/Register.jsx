import React, { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';

const Register = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
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
        // Check the form password and confirm the password before sending it to the server 
        if (form.password !== form.confirmPassword) {
            return alert("Confirm password isn't match")
        }

        console.log(form)
        // Send to backend
        try {
            const res = await axios.post("/api/register", form)

            console.log(res.data)
            toast.success(res.data)
        } catch (error) {
            const errorMsg = error.response?.data?.message
            toast.error(errorMsg)
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Sign up account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:black focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:black focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:black focus:border-transparent transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black text-white rounded-md shadow-md hover:scale-101 hover:duration-100"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Register