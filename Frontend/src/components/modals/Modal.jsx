import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ANEPBtn from "../utils/ANEPBtn";
import axios from "axios";
import { Card, Input } from "@material-tailwind/react";
import ChipDismissible from "../utils/ChipDismissible";
import { toast } from "react-toastify";
import { useDispatch ,useSelector } from "react-redux";
import { setModelessCompetences } from "../../slices/competenceSlice";
import AutocompleteInpute from "../ui/autocompleteInpute";

function Modal({
    url,
    autocompleteInpute,
    Inputes,
    name = "",
    className,
    icon
}) {

    const dispatch  = useDispatch();
    const modlessCompetence = useSelector((state)=>state.competence.ModelessCompetences);
    // show modal
    const [open, setOpen] = useState(false);
    const modal = () => {
        setOpen(!open);
    };



    // get modelsss competence and store it in state redux
    const autocompleteUrl = "http://localhost:5000/api/competence/modelessCompetences";
    const CompetenceslessModule = async () => {
        try {
            const res = await axios.get(autocompleteUrl);
            dispatch(setModelessCompetences(res.data))
        } catch (error) {}
    };
    useEffect(() => {
        CompetenceslessModule();
    }, []);

    const inputes = Inputes;

    // Create new module
    const [form, setForm] = useState({});
    const [error, setError] = useState(false);

    const createModule = async () => {
        try {
            const moduledata = {
                ...form,
                competences: selectedCompetences
            };

            // clean up 
            const response = await axios.post(url, moduledata);
            setCompetenceInputeVal("");
            setForm({});
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prevState) => ({
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
            const filteredAutocomplete = modlessCompetence.filter((Competence) => {
                return Competence.titre.toLowerCase().includes(value);
            });
            return setAutocomplete(filteredAutocomplete);
        } else {
            // If the input value is empty, set the autocomplete to the modlessCompetence
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

        // filter modlessCompetence from the new selected competence
        const filteredAutocomplete = modlessCompetence.filter(
            (competence) => competenceId !== competence._id
        );

       dispatch(setModelessCompetences(filteredAutocomplete))

        // set CompetenceInputeVal to none
        setCompetenceInputeVal("");
    };

    // remove Selected Competence logic
    const removeSelectedCompetence = (competenceId) => {
        // find the removed Competence
        const removedCompetence = selectedCompetences.find(
            (competence) => competence.id === competenceId
        );

        // return remove Selected Competence to modlessCompetence
        dispatch(setModelessCompetences([...modlessCompetence, removedCompetence]))

        // filter selected competence from removed Competence
        setSelectedCompetences((prevSelectedCompetences) =>
            prevSelectedCompetences.filter(
                (competence) => competence.id !== competenceId
            )
        );
    };


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
                                                                    form[
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
                                                <AutocompleteInpute autocomplete = {autocomplete}setCompetenceInputeVal = {setCompetenceInputeVal} competenceInputeVal = {competenceInputeVal} addCompetence = {addCompetence}/>
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
