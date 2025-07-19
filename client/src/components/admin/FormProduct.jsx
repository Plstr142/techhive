import React, { useState, useEffect } from "react";
import usetechhiveStore from "../../store/techhive-store"
import { createProduct } from "../../api/product";
import { toast } from 'react-toastify';
import Uploadfile from "./Uploadfile";

// obj initialstate
const initialState = {
    "title": "SSD WD BLUE",
    "description": "desc",
    "price": 500000,
    "quantity": 1000,
    "categoryId": "",
    "images": []
}

const FormProduct = () => {
    // Global state
    const token = usetechhiveStore((state) => state.token);
    const getCategory = usetechhiveStore((state) => state.getCategory);
    const categories = usetechhiveStore((state) => state.categories);
    // get list product from state to show on table 
    const getProduct = usetechhiveStore((state) => state.getProduct);
    const products = usetechhiveStore((state) => state.products);
    // console.log(products)

    const [form, setForm] = useState(initialState);

    useEffect(() => {
        getCategory(token);
        getProduct(token, 27);
    }, [])


    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            console.log(res)
            toast.success(`Add product ${res.data.title} successfully!`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white rounded-sm">
            <form onSubmit={handleOnSubmit}>
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

                <button className="bg-blue-500 rounded-sm p-1">Add product</button>

                <hr />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Date</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                // console.log(item)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <p>Edit</p>
                                            <p>Delete</p>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default FormProduct 