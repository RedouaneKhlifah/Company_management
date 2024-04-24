import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ANEPBtn from "../utils/ANEPBtn";
import axios from "axios";
import { Card, Input } from "@material-tailwind/react";
import ChipDismissible from "../utils/ChipDismissible";
import { toast } from "react-toastify";
function Modal({
    url,
    Inputes = [],
    autocompleteInpute,
    name = "",
    className,
    icon
}) {
    // show modal
    const [open, setOpen] = useState(false);
    const modal = () => {
        setOpen(!open);
    };

    // all Competence that has no specific key and  hase'nt been selected
    const [baseCompetence, setBaseCompetence] = useState([]);

    // autocomplete func
    const autocompleteUrl = "http://localhost:5000/api/competence/modelessCompetence";
    const CompetenceslessModule = async () => {
        try {
            const res = await axios.get(autocompleteUrl);
            const payload = res.data;
            setBaseCompetence(payload);
        } catch (error) {}
    };
    useEffect(() => {
        CompetenceslessModule();
    }, []);

    const inputes = Inputes;

    // InputesName = ["test", "titre", "red", "te"];
    // Create new module
    const [inputState, setInputStates] = useState({});

    // const [titre, setTitre] = useState("");
    const [error, setError] = useState(false);
    const createModule = async () => {
        try {
            const moduledata = {
                ...inputState,
                competences: selectedCompetences
            };

            const response = await axios.post(url, moduledata);
            setCompetenceInputeVal("");
            setInputStates([]);
            setSelectedCompetences([]);
            setOpen(false);
            toast.success("Ajouté avec succès");
            CompetenceslessModule();
        } catch (error) {
            setError(true);
        }
    };

    // temporary autocomplete array
    const [autocomplete, setAutocomplete] = useState([]);

    // inpute value
    const [competenceInputeVal, setCompetenceInputeVal] = useState("");

    // handle change
    const handleCompetenceInputeVal = (e) => {
        const { value } = e.target;
        setCompetenceInputeVal(value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputStates((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // autocompleteCompetence function request
    const autocompleteCompetence = (competenceInputeVal) => {
        // filter the payload from already selected Competence
        let value = competenceInputeVal?.toLowerCase();
        if (value) {
            // filter the payload from already selected Competence
            const filteredAutocomplete = baseCompetence.filter((Competence) => {
                return Competence.titre.toLowerCase().includes(value);
            });
            return setAutocomplete(filteredAutocomplete);
        } else {
            // If the input value is empty, set the autocomplete to the baseCompetence
            setAutocomplete([]);
        }
    };

    // track the inpute changes and run the utocompleteCompetence function
    useEffect(() => {
        autocompleteCompetence(competenceInputeVal);
    }, [competenceInputeVal]);

    // handle choosing competence
    const [selectedCompetences, setSelectedCompetences] = useState([]);

    const addCompetence = (competenceTitle, competenceId) => {
        setSelectedCompetences((prevSelectedCompetences) => [
            ...prevSelectedCompetences,
            { titre: competenceTitle, _id: competenceId }
        ]);

        // filter baseCompetence from the new selected competence
        const filteredAutocomplete = baseCompetence.filter(
            (competence) => competenceId !== competence._id
        );

        setBaseCompetence(filteredAutocomplete);

        // set CompetenceInputeVal to none
        setCompetenceInputeVal("");
    };

    // remove Selected Competence logic
    const removeSelectedCompetence = (competenceId) => {
        // find the removed Competence
        const removedCompetence = selectedCompetences.find(
            (competence) => competence.id === competenceId
        );

        // return remove Selected Competence to baseCompetence
        setBaseCompetence([...baseCompetence, removedCompetence]);

        // filter selected competence from removed Competence
        setSelectedCompetences((prevSelectedCompetences) =>
            prevSelectedCompetences.filter(
                (competence) => competence.id !== competenceId
            )
        );
    };

    console.log(name);

    return (
        <>
            <ANEPBtn
                icon={icon}
                name={name}
                onClick={modal}
                className={className}
            />
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-0 inset-0 overflow-y-auto"
                    onClose={setOpen}
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
                                <div className="sm:p-6 p6">
                                    <div className=" mt-3 text-center sm:mt-5 flex  items-center justify-center  ">
                                        <div className=" w-[500px] flex flex-col ">
                                            {/* titre inpute */}
                                            <div
                                                className={`grid ${
                                                    inputes.length > 1
                                                        ? "grid-cols-2 gap-4"
                                                        : ""
                                                }`}
                                            >
                                                {inputes.map((input) => {
                                                    return (
                                                        <React.Fragment
                                                            key={input}
                                                        >
                                                            <Input
                                                                label={input}
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                name={input}
                                                                value={
                                                                    inputState[
                                                                        input
                                                                    ] || ""
                                                                }
                                                                error={error}
                                                            />
                                                            {error && (
                                                                <p className="text-start text-red-600 text-base md:text-sm font-cairo normal-case pl-2 pt-2">
                                                                    {input}{" "}
                                                                    field is
                                                                    required.
                                                                </p>
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </div>
                                            {/* competence  */}
                                            {autocompleteInpute && (
                                                <div className="relative pt-4">
                                                    <Input
                                                        label="Competnece"
                                                        onChange={
                                                            handleCompetenceInputeVal
                                                        }
                                                        name="competenceInputeVal"
                                                        value={
                                                            competenceInputeVal
                                                        }
                                                        autoComplete="off"
                                                    />

                                                    {/* autocomplete  */}
                                                    {autocomplete.length >
                                                        0 && (
                                                        <Card className="absolute mt-2 w-full max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 z-50 ">
                                                            <div className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-blue-gray-700">
                                                                {autocomplete.map(
                                                                    (data) => {
                                                                        return (
                                                                            <button
                                                                                key={
                                                                                    data._id
                                                                                }
                                                                                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900 outline-none"
                                                                                style={{
                                                                                    position:
                                                                                        "relative",
                                                                                    overflow:
                                                                                        "hidden"
                                                                                }}
                                                                                onClick={() =>
                                                                                    addCompetence(
                                                                                        data.titre,
                                                                                        data._id
                                                                                    )
                                                                                }
                                                                            >
                                                                                {
                                                                                    data.titre
                                                                                }
                                                                            </button>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        </Card>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* the chips competences  */}

                                    <div className="pt-6 grid grid-cols-2 gap-3">
                                        {selectedCompetences.map(
                                            (competence) => (
                                                <ChipDismissible
                                                    key={competence.id}
                                                    onclose={
                                                        removeSelectedCompetence
                                                    }
                                                    value={competence.titre}
                                                    id={competence.id}
                                                />
                                            )
                                        )}
                                    </div>

                                    {/* the buttons  */}
                                    <div className=" mt-5 sm:mt-6 flex flex-row gap-x-4 justify-center ">
                                        <ANEPBtn
                                            name="Enregistrer"
                                            onClick={createModule}
                                            className=" w-[140px]"
                                        />

                                        <ANEPBtn
                                            name="Cancel"
                                            onClick={modal}
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
        </>
    );
}

export default Modal;
