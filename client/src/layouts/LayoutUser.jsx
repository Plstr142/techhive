import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"

const LayoutUser = () => {
    return (
        <div>
            <MainNav />

            <main className="h-full px-4 mt-2 mx-auto">
                {/* children page */}
                <Outlet />
            </main>
        </div>
    )
}
export default LayoutUser