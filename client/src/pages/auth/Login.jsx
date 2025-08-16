// rafce
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import usetechhiveStore from "../../store/techhive-store";

const Login = () => {
    // Javascript
    const navigate = useNavigate();
    const actionLogin = usetechhiveStore((state) => state.actionLogin);
    const user = usetechhiveStore((state) => state.user);
    console.log("user form zustand", user);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await actionLogin(form);
            const role = res.data.payload.role;
            roleRedirect(role);
            toast.success("Welcome Back");
        } catch (err) {
            console.log(err);
            const errMsg = err.response?.data?.message;
            toast.error(errMsg);
        }
    };

    const roleRedirect = (role) => {
        if (role === "admin") {
            navigate("/admin");
        } else {
            navigate("/user");
        }
    };

    return (
        <div
            className="min-h-screen flex 
  items-center justify-center bg-gray-600"
        >
            <div className="w-full shadow-md bg-white p-8 max-w-md rounded-2xl">
                <h1 className="text-2xl text-center my-4 font-bold">Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            placeholder="Email"
                            className="border w-full px-3 py-2 rounded
            focus:outline-none focus:ring-2 focus:ring-black
            focus:border-transparent"
                            onChange={handleOnChange}
                            name="email"
                            type="email"
                        />

                        <input
                            placeholder="Password"
                            className="border w-full px-3 py-2 rounded
                    focus:outline-none focus:ring-2 focus:ring-black
                    focus:border-transparent"
                            onChange={handleOnChange}
                            name="password"
                            type="password"
                        />
                        <button
                            className="bg-black rounded-md
             w-full text-white font-bold py-2 shadow
             hover:bg-black hover:duration-200 hover:scale-101
             "
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;