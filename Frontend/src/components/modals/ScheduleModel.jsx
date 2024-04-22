import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ANEPBtn from "../utils/ANEPBtn";
import axios from "axios";
import { Card, Input } from "@material-tailwind/react";
import ChipDismissible from "../utils/ChipDismissible";
import { toast } from "react-toastify";
import InputDate from "../utils/InputDate"
function ScheduleModel({
    open,setOpen
}) {

    const closeModal = ()=>{
        setOpen(false)
    }

    return (
        <div className="z-50 ">
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-0 inset-0 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg  pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full ">
                                {/* title of module */}
                                <div className="my-1 ">
                                    <h1 className="text-start text-anep-primary text-base md:text-lg font-cairo font-extrabold  normal-case border-b-2 pb-2 pl-6">
                                        Ajouter un nouveau module
                                    </h1>
                                </div>
                                {/* the body */}
                                <div className="flex justify-center sm:pt-6 pt6  ">
                                    <div className="w-10/12 flex flex-col gap-4">
                                        <Input
                                            label={"test"}
                                            name= {"test"}
                                            value={""}
                                        />
                                        <Input
                                            label={"test"}
                                            name= {"test"}
                                            value={""}
                                        />
                                        <InputDate/>

                                        <Input
                                            label={"test"}
                                            name= {"test"}
                                            value={""}
                                        />
                                        
                                    </div>
                                </div>
                                <div className="sm:p-6 p6">
                                    {/* the buttons  */}
                                    <div className=" mt-5 sm:mt-6 flex flex-row gap-x-4 justify-center ">
                                        <ANEPBtn
                                            name="Enregistrer"
                                            onClick={()=>console.log("craete test")}
                                            className=" w-[140px]"
                                        />

                                        <ANEPBtn
                                            name="Cancel"
                                            onClick={closeModal}
                                            color="gray"
                                            className=" w-[140px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}

export default ScheduleModel;
