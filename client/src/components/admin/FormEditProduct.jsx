import React, { useState, useEffect } from "react";
import usetechhiveStore from "../../store/techhive-store"
import { readProduct, listProduct, updateProduct } from "../../api/product";
import { toast } from 'react-toastify';
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

// obj initialstate
const initialState = {
    "title": "SSD WD BLUE",
    "description": "desc",
    "price": 500000,
    "quantity": 1000,
    "categoryId": "",
    // filtered data on localstorage
    "images": []
}

const FormEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Global state
    const token = usetechhiveStore((state) => state.token);
    const getCategory = usetechhiveStore((state) => state.getCategory);
    const categories = usetechhiveStore((state) => state.categories);
    // console.log(products)

    const [form, setForm] = useState(initialState);

    useEffect(() => {
        getCategory();
        fetchProduct(token, id, form)
    }, [])

    const fetchProduct = async (token, id, form) => {
        try {
            const res = await readProduct(token, id, form);
            console.log("res from backend", res)
            setForm(res.data)
        } catch (error) {
            console.log("Error fetch data", error)
        }
    };
    console.log(form)

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProduct(token, id, form)
            console.log(res)
            toast.success(`Update product ${res.data.title} successfully!`)
            navigate("/admin/product")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white rounded-sm shadow-md">
            <form onSubmit={handleOnSubmit}>
                <p className="text-xl">Add product data</p>
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
                    type="number"
                    className="border rounded-sm"
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder="price"
                    name="price"
                />
                <input
                    type="number"
                    className="border rounded-sm"
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder="quantity"
                    name="quantity"
                />
                <select
                    className="border rounded-sm"
                    name="categoryId"
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <hr />

                {/* Upload file */}
                <Uploadfile form={form} setForm={setForm} />

                <button className="bg-black text-white rounded-sm p-2 mb-9 cursor-pointer hover:scale-104 hover:-translate-y-1 hover:duration-200">Submit</button>

                <hr />
                <br />

            </form>
        </div>
    )
}
export default FormEditProduct 