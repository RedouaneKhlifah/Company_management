import React from "react";
import { Link } from "react-router-dom";

function SidebarButton({ link, title, imgsrc }) {
    return (
        <>
            <Link to={link}>
                <div>
                    <img className="" src={imgsrc} alt="" />
                    <button className="">{title}</button>
                </div>
            </Link>
        </>
    );
}

export default SidebarButton;
