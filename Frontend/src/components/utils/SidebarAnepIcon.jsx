import React from "react";

function SidebarAnepIcon({ state }) {
    return (
        <div className="w-full flex flex-col items-center justify-start mb-4 pt-2">
            {state ? (
                <img className="h-10" src={`${window.location.protocol}//${window.location.host}/logo-anep.svg`} alt="logo-anep" />
            ) : (
                <img
                    className="h-10"
                    src={`${window.location.protocol}//${window.location.host}/logo-anep-sm.svg`}
                    alt="logo-anep"
                />
            )}
            <div className="w-full flex items-center gap-0 pt-3">
                <div className="w-full h-px bg-gray-300"></div>
            </div>
        </div>
    );
}

export default SidebarAnepIcon;
