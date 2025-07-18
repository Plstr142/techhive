import React, { useState, useEffect } from "react";
import { createCategory } from "../../api/Category"
import usetechhiveStore from "../../store/techhive-store";


const FormCategory = () => {
    const token = usetechhiveStore((state) => state.token);

    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(token, name)
    }

    return (
        <div className="container mx-auto p-4 bg-white">
            <h1>Category Management</h1>
            <form className="my-4" onSubmit={handleSubmit}>
                <input onChange={(e) => setName(e.target.value)} className="border" type="text" />
                <button className="bg-blue-500">Add Category</button>
            </form>
        </div>
    )
}
export default FormCategory