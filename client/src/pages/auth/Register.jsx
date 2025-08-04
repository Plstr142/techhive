import React, { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import zxcvbn from "zxcvbn"
import { data } from "react-router-dom";

const registerSchema = z
    .object({
        email: z.string().email({ message: "Invalid email!!!" }),
        password: z.string().min(8, { message: "Password must be than 8 characters" }),
        confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, { message: "Password is not match", path: ["confirmPassword"] })

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    })

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const onSubmit = async (data) => {
        const passwordScore = zxcvbn(data.password).score
        if (passwordScore < 3) {
            toast.warning("Password isn't Strong!!!!!")
            return
        }
        console.log("password is correct")
        // Send to backend
        try {
            const res = await axios.post("/api/register", data)

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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>

                        <input {...register("email")} className="border" />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <input {...register("password")} className="border" />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>

                        <input {...register("confirmPassword")} className="border" />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
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