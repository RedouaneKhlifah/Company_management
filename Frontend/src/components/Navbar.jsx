import Breadcrumbs from "./utils/Breadcrumbs";
import Avatar from "./utils/Avatar";
import Dropdown from "./utils/Dropdown";
import Notif from "./utils/Notif";


const Navbar = () => {
    return (
        <>
            <nav className="m-1.5 rounded-2xl  bg-anep-primary drop-shadow-black-sm">
                <div className="flex justify-between">
                    <div>
                        <Breadcrumbs />
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between m-5 ">
                            <a href="#" className="flex items-center">
                                <span className="self-center text-2xl font-cairo whitespace-nowrap text-anep-yellow">
                                    Accueil
                                </span>
                            </a>
                        </div>
                    </div>
                    <ul className="flex justify-around items-center m-5 p-2 md:order-2 md:space-x-4">
                        <li>
                            <Notif />
                        </li>
                        <li>
                            <Avatar />
                        </li>
                        <li className="text-white">
                            <p>Nom et Prenom</p>
                            <p>Role</p>
                        </li>
                        <li>
                            <Dropdown />
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
