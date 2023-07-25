import React from "react";
import { NavLink } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";

function SidebarButton({ link, title, icon, state }) {
    return (
        <>
            <NavLink to={link}>
                <div>
                    <button
                        className={`rounded-md m-auto ${
                            state ? "w-10/12" : "w-10"
                        }  h-11  text-white text-base bg-anep-primary flex flex-row justify-start
                        } items-center gap-2  transition-all duration-500 navlink`}
                    >
                        <div className={`pl-2`}>
                            <HiAcademicCap
                                className={` ${
                                    state
                                        ? "transform scale-100"
                                        : "transform scale-150"
                                } h-5 w-5 text-white transition-transform duration-500`}
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
