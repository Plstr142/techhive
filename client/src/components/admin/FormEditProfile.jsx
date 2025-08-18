import React, { useState, useEffect } from "react";
import usetechhiveStore from "../../store/techhive-store";
import { readProfile, updateProfile } from "../../api/Profile";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams } from "react-router-dom";

// obj initialstate
const initialState = {
    username: "",
    bio: "",
    // images: []
}

const FormEditProfile = () => {
    const { id } = useParams();
    const token = usetechhiveStore((state) => state.token);
    const username = usetechhiveStore((state) => state.username);
    const bio = usetechhiveStore((state) => state.bio);
    const getProfile = usetechhiveStore((state) => state.getProfile);

    // const userId = users?.id;

    const [form, setForm] = useState(initialState);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await readProfile(token, id);
                setForm({
                    username: res.data.username || "",
                    bio: res.data.bio || ""
                });
            } catch (error) {
                console.log("Error fetch profile:", error);
            }
        };
        if (id) fetchProfile();
    }, [id, token]);

    // const fetchProfile = async (token, id, form) => {
    //     try {
    //         const res = await readProfile(token, id, form);
    //         console.log("res from backend", res)
    //         setForm(res.data)
    //     } catch (error) {
    //         console.log("Error fetch data", error)
    //     }
    // };
    // console.log(form)

    // const handleGetUsers = (token) => {
    //     getListAllUsers(token)
    //         .then((res) => {
    //             setUsers(res.data)
    //         })
    //         .catch((error => console.log(error)))
    // };

    // const handleOnChange = (e) => {
    //     usetechhiveStore.setState({ [e.target.name]: e.target.value })
    // }

    // const handleOnSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const res = await updateProfile(token, id, { username, bio })
    //         toast.success(`Profile updated successfully!`)
    //         usetechhiveStore.setState({
    //             username: res.data.username,
    //             bio: res.data.bio
    //         })
    //     } catch (error) {
    //         console.log("Error updating profile:", error);
    //         toast.error("Failed to update profile");
    //     }
    // }

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProfile(token, id, form);
            toast.success("Profile updated successfully!");
            usetechhiveStore.setState({
                username: res.data.username,
                bio: res.data.bio
            });
        } catch (error) {
            console.log("Error updating profile:", error);
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="container mx-auto p-4 bg-white rounded-sm shadow-md">
            <form onSubmit={handleOnSubmit} className="flex flex-col w-1/2">
                <p className="text-xl mb-4">Edit Profile</p>
                <input
                    className="border rounded-sm mb-2 p-1"
                    value={form.username}
                    onChange={handleOnChange}
                    placeholder="username"
                    name="username"
                    required
                />
                <textarea
                    className="border rounded-sm mb-2 p-1"
                    value={form.bio}
                    onChange={handleOnChange}
                    placeholder="Bio"
                    name="bio"
                    rows={4}
                />
                <button
                    type="submit"
                    className="bg-black text-white rounded-sm p-2 mt-4 cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all duration-200 w-1/3"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
export default FormEditProfile 