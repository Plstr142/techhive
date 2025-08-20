import React, { useState, useEffect } from "react";
import usetechhiveStore from "../../store/techhive-store";
import { readProfile, updateProfile } from "../../api/Profile";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

// obj initialstate
const initialState = {
    "username": "",
    "bio": "",
    // images: []
}

const FormEditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const token = usetechhiveStore((state) => state.token);
    const getProfile = usetechhiveStore((state) => state.getProfile);

    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await readProfile(token, id);
                setForm({
                    username: res.data.username || "",
                    bio: res.data.bio || ""
                });
            } catch (error) {
                console.error("Error fetch profile:", error);
                toast.error("Failed to load profile");
            }
        };

        if (id && token) {
            fetchProfile();
        }
    }, [id, token]);

    useEffect(() => {
        console.log("Form state updated:", form);
    }, [form]);

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateProfile(token, id, form);
            toast.success(`Profile ${res.data.username} updated successfully!`)
            navigate("/user/profile")
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/user/profile");
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black">
            <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-800">
                <div className="p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-black">
                        Edit Profile
                    </h1>

                    <form onSubmit={handleOnSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Username Input */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    className="w-full border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-colors"
                                    value={form.username}
                                    onChange={handleOnChange}
                                    placeholder="Enter your username"
                                    name="username"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {/* Bio Textarea */}
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-black mb-2">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    className="w-full border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-colors resize-vertical min-h-[100px]"
                                    value={form.bio}
                                    onChange={handleOnChange}
                                    placeholder="Tell us about yourself..."
                                    name="bio"
                                    rows={4}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Button Group */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto bg-gray-500 text-black hover:text-white disabled:bg-gray-400 rounded-sm py-2 px-6 font-medium transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:hover:scale-100 disabled:hover:translate-y-0 min-w-[120px]"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </div>
                                ) : (
                                    "Update Profile"
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="w-full sm:w-auto bg-black text-white hover:text-black hover:bg-red-500 disabled:bg-gray-400 rounded-sm py-2 px-6 font-medium transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:hover:scale-100 disabled:hover:translate-y-0 min-w-[120px]"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormEditProfile