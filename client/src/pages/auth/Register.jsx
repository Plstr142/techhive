import React, { useState, useEffect } from "react"
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
    const [passwordScore, setPasswordScore] = useState(0)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    })

    const validatePassword = () => {
        let password = watch().password
        return zxcvbn(password ? password : "").score
    }

    useEffect(() => {
        setPasswordScore(validatePassword())
    }, [watch().password])

    const onSubmit = async (data) => {
        // const passwordScore = zxcvbn(data.password).score
        // if (passwordScore < 3) {
        //     toast.warning("Password isn't Strong!!!!!")
        //     return
        // }
        // console.log("password is correct")
        // // Send to backend
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

    // const phongs4thon = Array.from(Array(5))
    // console.log(phongs4thon)
    console.log(passwordScore)

    return (
        <div className="min-h-screen bg-gray-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Sign up account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-4">

                        <div>
                            <input {...register("email")}
                                className={`border rounded-sm w-full
                            focus:outline-none focus:ring-1 focus:border-transparent ${errors.email && "border-red-500"}`}
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <input {...register("password")}
                                type="password"
                                placeholder="Password"
                                className={`border rounded-sm w-full
                            focus:outline-none focus:ring-1 focus:border-transparent ${errors.password && "border-red-500"}`}
                            />

                            {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}

                            {
                                watch().password?.length > 0 && <div className="flex mt-1">
                                    {
                                        Array.from(Array(8).keys()).map((item, index) => (
                                            <span className="w-1/5 px-1" key={index}>
                                                <div className={`rounded h-2 ${passwordScore <= 2
                                                    ? "bg-red-500"
                                                    : passwordScore < 4 ? "bg-yellow-500" : "bg-green-500"
                                                    } `}>
                                                </div>
                                            </span>
                                        ))
                                    }
                                </div>
                            }
                        </div>

                        <div>
                            <input {...register("confirmPassword")}
                                type="password"
                                placeholder="Confirm Password"
                                className={`border rounded-sm w-full
                            focus:outline-none focus:ring-1 focus:border-transparent ${errors.confirmPassword && "border-red-500"}`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-black text-white rounded-md shadow-md hover:scale-101 hover:duration-100 font-bold"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}
export default Register