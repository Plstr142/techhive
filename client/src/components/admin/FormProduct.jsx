import React, { useState, useEffect } from "react";
import usetechhiveStore from "../../store/techhive-store"

const initialState = {
    "title": "SSD WD BLUE",
    "description": "desc",
    "price": 500000,
    "quantity": 1000,
    "categoryId": 22,
    "images": []
}

const FormProduct = () => {
    // Global state
    const token = usetechhiveStore((state) => state.token);
    const getCategory = usetechhiveStore((state) => state.getCategory);
    const categories = usetechhiveStore((state) => state.categories);
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        getCategory(token);
    }, [])
    console.log(categories)

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
    }

    return (
        <div className="container mx-auto p-4 bg-white rounded-sm">
            <form>
                <h1>Add product data</h1>
                <input
                    className="border rounded-sm"
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder="Title"
                    name="title"
                />
                <input
                    className="border rounded-sm"
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder="Description"
                    name="description"
                />
                <input
                    className="border rounded-sm"
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder="price"
                    name="price"
                />
                <input
                    className="border rounded-sm"
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder="quantity"
                    name="quantity"
                />
                <select className="border rounded-sm" name="categoryId" onChange={handleOnChange}>
                    <option value={0}>Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }s
                </select>
                <hr />
                <button className="bg-blue-500 rounded-sm p-1">Add product</button>
            </form>
        </div>
    )
}
export default FormProduct 