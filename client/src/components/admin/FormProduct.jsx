import React, { useState, useEffect } from "react";
import usetechhiveStore from "../../store/techhive-store"
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from 'react-toastify';
import Uploadfile from "./UploadFile";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/Number";

// obj initialstate
const initialState = {
    "title": "",
    "description": "",
    "price": 0,
    "quantity": 0,
    "categoryId": "",
    // filtered data on localstorage
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

    const [form, setForm] = useState({
        "title": "",
        "description": "",
        "price": 0,
        "quantity": 0,
        "categoryId": "",
        // filtered data on localstorage
        "images": []
    });

    useEffect(() => {
        getCategory();
        getProduct(100);
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
            setForm(initialState)
            getProduct()
            toast.success(`Add product ${res.data.title} successfully!`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you confirm to delete?")) {
            try {
                const res = await deleteProduct(token, id);
                console.log(res)
                toast.success("Deleted product successfully!")
                getProduct()
            } catch (error) {
                console.log(error)
            }
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

                <button className="bg-black text-white rounded-sm p-2 mb-9 cursor-pointer hover:scale-104 hover:-translate-y-1 hover:duration-200">Add product</button>

                <br />
                <table className="table w-full border-transparent">
                    <thead className="h-10">
                        <tr className="bg-gray-400">
                            <th scope="col" className="rounded-tl-sm">No.</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Date</th>
                            <th scope="col" className="rounded-tr-sm">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                // console.log(item)
                                return (
                                    <tr key={index} className="border-1 border-gray-100 bg-gray-100 items-center">
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {
                                                item.images.length > 0
                                                    ? <img
                                                        className="w-30 h-30 rounded-md shadow-md hover:scale-104 m-1"
                                                        src={item.images[0].url} /> : <div className="w-30 h-30 bg-gray-200 rounded-md flex items-center justify-center hover:scale-104 shadow-sm m-1 text-gray-300">No Image</div>
                                            }
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{numberFormat(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td className="py-1 px-2 border-gray-100 bg-gray-300">{item.updatedAt}</td>
                                        <td className="text-center p-2 h-32 w-24">
                                            <div className="flex flex-col items-center justify-center gap-1 h-full">
                                                <p className="bg-gray-500 hover:text-white rounded-sm py-1 px-4 shadow-sm w-full cursor-pointer hover:scale-104 hover:-translate-y-1 hover:duration-200">
                                                    <Link to={'/admin/product/' + item.id}>Edit</Link>
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