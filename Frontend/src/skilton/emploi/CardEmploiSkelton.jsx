import React from "react";
import BtnSkelton from "../ui/BtnSkelton";

function CardEmploiSkelton() {
    return (
        <div className="max-w-full  bg-gray-100 rounded-lg shadow-lg mt-6">
            <div className="animate-pulse p-6">
                <div className="h-6 w-6/12 bg-gray-200 mb-4"></div>
                <div className="">
                    <div>
                        <div className="h-6 w-10/12 bg-gray-200 mb-2"></div>
                        <div className="h-6 w-4/12 bg-gray-200"></div>
                    </div>
                </div>
            </div>
            <div className="p-6 pt-0 flex justify-center">
                <BtnSkelton />
            </div>
        </div>
    );
}
export default CardEmploiSkelton;

