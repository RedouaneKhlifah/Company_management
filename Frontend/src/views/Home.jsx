import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Main() {
    return (
        <main className="container mt-3 mx-auto grid grid-cols-[auto_1fr] gap-x-6">
            {/* Side bar */}
            <Sidebar />
            {/* End of Side bar */}
            <div>
                {/* Header */}
                <Navbar />
                {/* Pages */}
                <Outlet />
            </div>
        </main>
    );
}

export default Main;
