import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"

const Layout = () => {
    return (
        <div>
            <MainNav />

            <main>
                {/* children page */}
                <Outlet />
            </main>
        </div>
    )
}
export default Layout