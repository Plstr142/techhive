import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"

const Layout = () => {
    return (
        <div>
            <MainNav />

            <main className="h-full">
                {/* children page */}
                <Outlet />
            </main>
        </div>
    )
}
export default Layout