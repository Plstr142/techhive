import React, { useState, useEffect } from "react"
import usetechhiveStore from "../store/techhive-store"
import { currentAdmin } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect"

const ProtectRouteAdmin = ({ element }) => {

    const [ok, setOk] = useState(false)
    const user = usetechhiveStore((state) => state.user);
    const token = usetechhiveStore((state) => state.token);
    // console.log(user)

    useEffect(() => {
        if (user && token) {
            // send to backend
            currentAdmin(token)
                .then((res) => {
                    console.log(res);
                    setOk(true);
                })
                .catch((error) => {
                    console.error(error);
                    setOk(false);
                });
        }
    }, [user, token])

    return ok ? element : <LoadingToRedirect />
}
export default ProtectRouteAdmin