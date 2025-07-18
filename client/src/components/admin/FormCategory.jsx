import React, { useState, useEffect } from "react";
import { createCategory, removeCategory } from "../../api/Category"
import usetechhiveStore from "../../store/techhive-store";
import { toast } from 'react-toastify';

const FormCategory = () => {
    const token = usetechhiveStore((state) => state.token);
    const [name, setName] = useState("");
    // const [categories, setCategories] = useState([]);
    const categories = usetechhiveStore((state) => state.categories);
    const getCategory = usetechhiveStore((state) => state.getCategory);

    useEffect(() => {
        getCategory(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            return toast.warning("Please fill data")
        }

        try {
            const res = await createCategory(token, { name });
            console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} successfully!`);
            getCategory(token);
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemove = async (id) => {
        console.log(id)
        try {
            const res = await removeCategory(token, id);
            console.log(res)
            toast.success(`Deleted ${res.data.name} successfully!`)
            getCategory(token);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white rounded-sm">
            <h1>Category Management</h1>
            <form className="my-4" onSubmit={handleSubmit}>
                <input onChange={(e) => setName(e.target.value)} className="border" type="text" />
                <button className="bg-blue-500">Add Category</button>
            </form>

            <hr />
            {/* // list category */}
            <ul className="list-none">
                {
                    // parameters element ,index, item
                    categories.map((item, index) =>
                        <li
                            className="flex justify-between my-2"
                            key={index}>
                            <span>
                                {item.name}
                            </span>
                            <button
                                className="bg-red-500 p-1 rounded-sm"
                                onClick={() => handleRemove(item.id)}
                            >Delete</button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
export default FormCategory