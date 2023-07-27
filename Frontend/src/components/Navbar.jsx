import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import Breadcrumbs from "./utils/BreadcrumbsFun";
import Avatar from "./utils/Avatar";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const expires = localStorage.getItem("expiresAt");
    const location = useLocation();
    const pathArr = location.pathname.replace(/^\/|\/$/g, "").split("/");
    const title = pathArr[pathArr.length - 1];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(clearCredentials());
            navigate("/signin");
        } catch (error) {
            console.log("logout error");
        }
    };

    useState(() => {
        if (expires < Date.now()) {
            (async function () {
                try {
                    await logout().unwrap();
                    dispatch(clearCredentials());
                } catch (error) {
                    toast.error("Une erreur s'est produite.");
                }
            })();
        }
    }, [expires, dispatch]);

    return (
        <nav className="rounded-2xl sticky top-3 bg-anep-primary drop-shadow-black-sm">
            <div className="flex justify-between">
                <div className="xl:2xl-max:w-2/3">
                    <Breadcrumbs />
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between m-5">
                        <a href="#" className="flex items-center">
                            <span className="lg:w-[400px] xl:w-[600px] 2xl:w-[800px] self-center text-2xl lg:text-3xl font-cairo font-bold text-anep-yellow truncate">
                                {location.pathname === "/" ? "Accueil" : title}
                            </span>
                        </a>
                    </div>
                </div>
                <ul className="my-3 px-2 flex justify-around items-center gap-x-1">
                    <li>
                        <Icon
                            icon="material-symbols:notifications"
                            color="white"
                            width="30"
                            height="30"
                        />
                    </li>
                    <li>
                        <Avatar
                            className="w-9 h-9 min-w-[36px] min-h-[36px] md:w-12 md:h-12 md:min-w-[48px] md:min-h-[48px] xl:w-16 xl:h-16 xl:min-w-[64px] xl:min-h-[64px] ring-1 xl:ring-2"
                            src="https://cdn.discordapp.com/attachments/1093229006402375680/1093517657795477534/117645l.jpg"
                            alt={`Avatar de ${userInfo.otherInfo.fullName}`}
                        />
                    </li>
                    <li className="text-white">
                        <p className="px-2 text-lg font-semibold ">
                            {userInfo.otherInfo.fullName} Saissi Hassani
                        </p>
                        <p className="px-2 text-anep-secondary text-sm font-meduim">
                            {userInfo.personalInfo["Libellé grade"] ??
                                "Aucun libellé de grade xcsfsfd sdfsfsd"}
                        </p>
                    </li>
                    <li>
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <div>
                                <Menu.Button className="flex items-center text-3xl text-gray-400 hover:text-gray-50 focus:text-anep-yellow focus:drop-shadow-white-custom">
                                    <span className="sr-only">
                                        Open options
                                    </span>
                                    <Icon icon="material-symbols:arrow-drop-down-rounded" />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700",
                                                        "block px-4 py-2 text-sm"
                                                    )}
                                                >
                                                    Account settings
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700",
                                                        "block px-4 py-2 text-sm"
                                                    )}
                                                >
                                                    Support
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <form method="POST" action="#">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        type="submit"
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700",
                                                            "block w-full text-left px-4 py-2 text-sm"
                                                        )}
                                                    >
                                                        Some request
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </form>
                                        <Menu.Item onClick={logoutHandler}>
                                            {({ active }) => (
                                                <button
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700",
                                                        "w-full text-left block px-4 py-2 text-sm"
                                                    )}
                                                >
                                                    Déconnexion
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
