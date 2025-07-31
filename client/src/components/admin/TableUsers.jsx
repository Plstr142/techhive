import React, { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import usetechhiveStore from "../../store/techhive-store";

const TableUsers = () => {
    const token = usetechhiveStore((state) => state.token);
    const [users, setUsers] = useState([])

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

    console.log(users)

    return (
        <div className="container mx-auto p-4 bg-white rounded-sm shadow-md">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>index</th>
                        <th>Email</th>
                        {/* <th>Date</th> */}
                        <th>Role</th>
                        <th>Status</th>
                        <th>Manage</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users?.map((element, index) => (
                            <tr key={element.id}>
                                <td>{index + 1}</td>
                                <td>{element.email}</td>
                                {/* <td>{element.updatedAt}</td> */}
                                <td>{element.role}</td>
                                <td>
                                    {/* ternary true false enabled */}
                                    {element.enabled ? "Active" : "Inactive"}
                                </td>
                                <td>
                                    action
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    )
}
export default TableUsers