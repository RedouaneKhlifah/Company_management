import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

function SidebarButton({ link, title, icon, state }) {
    return (
        <>
            <NavLink to={link} className="mx-auto w-10/12 text-white text-base lg:text-lg navlink rounded-md overflow-hidden">
                <div>
                    <button
                        
                        className="h-11 w-full flex flex-row justify-start items-center gap-2"
                    >
                        <div className={`${state ? "px-2 " : "p-3"}`}>
                            <Icon
                                icon={icon}
                                className={`text-2xl ${
                                    state
                                        ? "transform scale-100"
                                        : "transform scale-150"
                                } transition-transform duration-500`}
                            />
                        </div>
                        {state && title}
                    </button>
                </div>
            </NavLink>
        </>
    );
}

export default SidebarButton;
