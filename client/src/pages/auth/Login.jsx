import React, { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';

const Login = () => {
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
        // Check the form password and confirm the password before sending it to the server 
        if (form.password !== form.confirmPassword) {
            return alert("Confirm password isn't match")
        }

        console.log(form)
        // Send to backend
        try {
            const res = await axios.post("/api/login", form)

            console.log(res.data)
            toast.success(res.data)
        } catch (error) {
            const errorMsg = error.response?.data?.message
            toast.error(errorMsg)
            console.log(error)
        }
    }

    return (
        <div>
            Sign up account
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
                Confirm Password:
                <input className="border rounded-sm"
                    onChange={handleOnChange}
                    name="confirmPassword"
                    type="text"
                />
                <button className="bg-blue-500 rounded-sm">
                    Register
                </button>
            </form>
        </div>
    )
}
export default Login