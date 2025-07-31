import React, { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import usetechhiveStore from "../../store/techhive-store";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import { toast } from 'react-toastify';

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

    const handleChangeUserStatus = (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                console.log(res)
                handleGetUsers(token) // refresh list
                toast.success("Update Status successfully!")
            })
            .catch(error => console.log(error))
    }

    const handleChangeUserRole = (userId, userRole) => {
        // console.log(userId, userStatus)
        const value = {
            id: userId,
            role: userRole
        }
        changeUserRole(token, value)
            .then((res) => {
                console.log(res)
                handleGetUsers(token) // refresh list
                toast.success("Update Role successfully!")
            })
            .catch(error => console.log(error))
    }

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
                                <td className="flex justify-center">{index + 1}</td>
                                <td>{element.email}</td>
                                {/* <td>{element.updatedAt}</td> */}
                                <td>
                                    <select
                                        onChange={(e) => handleChangeUserRole(element.id, e.target.value)}
                                        value={element.role}>
                                        <option>user</option>
                                        <option>admin</option>
                                    </select>
                                </td>
                                <td>
                                    {/* ternary true false enabled */}
                                    {element.enabled ? "Active" : "Inactive"}
                                </td>
                                <td className="flex justify-center">
                                    <button
                                        className="bg-yellow-300 p-1 rounded-sm shadow-md w-40"
                                        onClick={() => handleChangeUserStatus(element.id, element.enabled)}
                                    >
                                        {element.enabled ? "Disable" : "Enable"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}
export default TableUsers