import React, { useState, useEffect } from "react";
import usetechhiveStore from "../../store/techhive-store"
import { getListAllUsers } from "../../api/admin";
import { toast } from 'react-toastify';
import Uploadfile from "./Uploadfile";
import { useParams } from "react-router-dom";
import { getProfile } from "../../api/user";
import { updateProfile } from "../../api/Profile";

// obj initialstate
const initialState = {
    "profilename": "",
    "bio": "",
    "images": []
}

const FormEditProfile = () => {
    const { id } = useParams();

    // Global state
    const token = usetechhiveStore((state) => state.token);
    const [users, setUsers] = useState([])

    // const userId = users?.id;

    const [form, setForm] = useState(initialState);

    useEffect(() => {
        handleGetUsers(token)
    }, [])

    const handleGetUsers = (token) => {
        getListAllUsers(token)
            .then((res) => {
                setUsers(res.data)
            })
            .catch((error => console.log(error)))
    };

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProfile(token, userId, form)
            console.log(res)
            toast.success(`Profile ${res.data.title} updated successfully!`)
            usetechhiveStore.setState({ profilename: form.profilename });
        } catch (error) {
            console.log("Error updating profile:", error);
        }
    }

    return (

        <div className="container mx-auto p-4 bg-white rounded-sm shadow-md">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Profile name</th>
                        <th>Bio</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users?.map((element, index) => (
                            <tr key={element.id}>
                                <td className="flex justify-center">{index + 1}</td>
                                <td>{element.email}</td>

                                <td>
                                    {/* ternary true false enabled */}
                                    {element.bio}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >

        // <div className="container mx-auto p-4 bg-white rounded-sm shadow-md">
        //     <form onSubmit={handleOnSubmit} className="flex flex-col w-1/2">
        //         <p className="text-xl">Edit Profile</p>
        //         <input
        //             className="border rounded-sm"
        //             value={form.profilename}
        //             onChange={handleOnChange}
        //             placeholder="Profilename"
        //             name="profilename"
        //         />
        //         <textarea
        //             className="border rounded-sm"
        //             value={form.bio}
        //             onChange={handleOnChange}
        //             placeholder="Bio"
        //             name="bio"
        //         />

        //         <hr />

        //         {/* Upload file */}
        //         <Uploadfile form={form} setForm={setForm} />

        //         <button className="bg-black text-white rounded-sm p-2 mb-9 cursor-pointer hover:scale-104 hover:-translate-y-1 hover:duration-200 w-1/5">Submit</button>
        //     </form>
        // </div>
    )
}
export default FormEditProfile 