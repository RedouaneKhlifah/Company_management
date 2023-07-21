import React from "react";
import { Link } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";

function SidebarButton({ link, title, icon, state }) {
    return (
        <>
            <Link to={link}>
                <div>
                    <button
                        className={`rounded-md ${
                            state ? "w-40" : "w-10"
                        } h-11  text-white bg-anepBlue flex flex-row justify-start
                        } items-center gap-3 transition-all duration-500`}
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
            </Link>
        </>
    );
}

export default SidebarButton;
