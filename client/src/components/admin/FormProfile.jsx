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
        if (user?.id) {
            setForm(prev => ({ ...prev, userId: user.id }));
        }
        getProfile();
    }, [user])


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
        <div className="container mx-auto p-4 bg-white rounded-sm shadow-md">
            <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
                <p className="text-xl">Add profile data</p>
                <div className="flex flex-row gap-2">
                    <input
                        className="border rounded-sm"
                        value={form.username}
                        onChange={handleOnChange}
                        placeholder="Username"
                        name="username"
                    />
                    <input
                        className="border rounded-sm"
                        value={form.bio}
                        onChange={handleOnChange}
                        placeholder="Bio"
                        name="bio"
                    />
                </div>

                <hr />

                {/* Upload file */}
                {/* <Uploadfile form={form} setForm={setForm} /> */}

                <button className="bg-black text-white rounded-sm p-2 mb-9 w-30 cursor-pointer hover:scale-104 hover:-translate-y-1 hover:duration-200">Add profile</button>

                <table className="table w-full border-transparent">
                    <thead className="h-10">
                        <tr className="bg-gray-400">
                            <th scope="col">Profile name</th>
                            <th scope="col">Bio</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profile.map((item, index) => (
                            <tr key={index} className="border-1 border-gray-100 bg-gray-100 items-center">
                                <td>{item.username}</td>
                                <td>{item.bio}</td>
                                <td className="text-center p-2 h-32 w-24">
                                    <div className="flex flex-col items-center justify-center gap-1 h-full">
                                        <p className="bg-gray-500 hover:text-white rounded-sm py-1 px-4 shadow-sm w-full cursor-pointer hover:scale-104 hover:-translate-y-1 hover:duration-200">
                                            <Link to={'/admin/profile/' + item.id}>Edit</Link>
                                        </p>
                                        <p
                                            className="bg-black hover:bg-red-500 hover:text-black text-white rounded-sm py-1 px-4 shadow-sm cursor-pointer hover:scale-104 hover:duration-200"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default FormProfile