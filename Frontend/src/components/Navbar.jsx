import Breadcrumbs from "./utils/BreadcrumbsFun";
// import Profile_picture from "./utils/Profile_picture";
// import Dropdown from "./utils/Dropdown";
// import Notif from "./utils/Notif";
import { useLocation } from "react-router-dom";




const Navbar = () => {
    const location = useLocation();
    const pathArr = location.pathname.replace(/^\/|\/$/g, "").split("/");
    return (
        <>
        
            <nav className="m-1.5 rounded-2xl  bg-anep-primary drop-shadow-black-sm">
                <div className="flex justify-between">
                    <div>
                        <Breadcrumbs />
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between m-5 ">
                            <a href="#" className="flex items-center">
                                <span className="self-center text-2xl font-cairo whitespace-nowrap text-anep-yellow">
                                    {location.pathname === "/"
                                ? "Acceuil"
                                : pathArr}
                                </span>
                            </a>
                        </div>
                    </div>
                    <ul className="flex justify-around items-center m-5 p-2 md:order-2 md:space-x-4">
                        <li>
                            {/* <Notif /> */}
                        </li>
                        <li>
                            {/* <Profile_picture
                                Taille="lg"
                                Alt="avatar"
                                Source="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                            /> */}
                        </li>
                        <li className="text-white">
                            <p>Nom et Prenom</p>
                            <p>Role</p>
                        </li>
                        <li>
                            {/* <Dropdown /> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
