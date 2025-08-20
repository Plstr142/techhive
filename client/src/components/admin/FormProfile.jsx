import React, { useState, useEffect } from "react";
import usetechhiveStore from "../../store/techhive-store"
import { createProfile, deleteProfile } from "../../api/Profile";
import { toast } from 'react-toastify';
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";

// obj initialstate
const initialState = {
    "username": "",
    "bio": "",
    "userId": "",
    // filtered data on localstorage
    // "imageUrl": []
}

const FormProfile = () => {
    // Global state
    const token = usetechhiveStore((state) => state.token);
    const user = usetechhiveStore((state) => state.user);
    // get list product from state to show on table 
    const getProfile = usetechhiveStore((state) => state.getProfile);
    const profile = usetechhiveStore((state) => state.profile);
    // console.log(products)
    console.log("profile", profile);

    const [form, setForm] = useState({
        "username": "",
        "bio": "",
        "userId": "",
        // filtered data on localstorage
        // "imageUrl": []
    });

    useEffect(() => {
        if (user?.id && token) {
            setForm(prev => ({ ...prev, userId: user.id }));
        }
        getProfile();
    }, [user, token])

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProfile(token, form)
            console.log(res)
            setForm(initialState)
            getProfile()
            toast.success(`Add ${res.data.username} successfully!`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you confirm to delete?")) {
            try {
                const res = await deleteProfile(token, id);
                console.log(res)
                toast.success("Deleted profile successfully!")
                getProfile()
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-800">
                <form className="p-6" onSubmit={handleOnSubmit}>
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-black">
                        Your Profile
                    </h1>

                    {/* Table Container with horizontal scroll */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] border-collapse border-2 border-black rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-black text-white">
                                    <th className="border border-gray-600 px-4 py-3 text-center font-semibold">
                                        Profile Name
                                    </th>
                                    <th className="border border-gray-600 px-4 py-3 text-center font-semibold">
                                        Bio
                                    </th>
                                    <th className="border border-gray-600 px-4 py-3 text-center font-semibold">
                                        Manage
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {profile && profile.length > 0 ? (
                                    profile.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200 transition-colors`}
                                        >
                                            <td className="border border-gray-600 px-4 py-4 text-center">
                                                <div className="font-medium text-black break-words">
                                                    {item.username || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="border border-gray-600 px-4 py-4">
                                                <div className="max-w-xs break-words whitespace-normal text-left text-black leading-relaxed">
                                                    {item.bio || 'No bio available'}
                                                </div>
                                            </td>
                                            <td className="border border-gray-600 px-4 py-4">
                                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 min-h-[60px]">
                                                    <Link
                                                        to={'/user/profile/' + item.id}
                                                        className="w-full sm:w-auto bg-gray-500 text-black hover:text-white rounded-sm py-2 px-4 text-sm font-medium text-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="w-full sm:w-auto bg-black hover:bg-red-500 text-white hover:text-black rounded-sm py-2 px-4 text-sm font-medium transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="border border-gray-600 px-4 py-8 text-center text-gray-600">
                                            No profiles found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile-friendly message */}
                    <div className="sm:hidden mt-4 text-center text-sm text-gray-600">
                        <p>Swipe left/right to see all columns</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormProfile