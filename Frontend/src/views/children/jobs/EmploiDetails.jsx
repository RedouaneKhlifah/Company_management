import { redirect, useLoaderData } from "react-router-dom";
import PageNotFound from "../../PageNotFound";

function EmploiDetails() {
    const emploiData = useLoaderData();
    // console.log(emploiData.message);
    console.log(emploiData);
    
        // alert(emploiData.message); //TODO add error handling here
        
    
    const titre = emploiData.info_emploi ? emploiData.info_emploi.Titre : "N/A";
    const Expérience = emploiData.info_emploi ? emploiData.info_emploi.Expérience : "N/A";
    const Formation = emploiData.info_emploi ? emploiData.info_emploi.Formation : "N/A";
    const Spécialité = emploiData.info_emploi ? emploiData.info_emploi.Spécialité : "N/A";

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-6 m-4 ">
                <div className="relative rounded-xl bg-anep-primary col-span-6 z-20 flex justify-start mx-4 ">
                    <h4 className="text-anep-yellow font-bold m-3 text-lg">Details</h4>
                </div>
                <div className=" bg-anep-secondary rounded-xl bottom-5 relative z-10 col-span-6">
                    <div className="m-10">
                        <h5 className="font-bold uppercase text-2xl">{titre}</h5>
                        <div class="border border-blue-500 max-w-sm"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex gap-1">
                                    <p className="font-bold ">Spécialité: </p>
                                    {Spécialité}
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-bold">Formation: </p>
                                    {Formation}
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-bold">Experience: </p>
                                    {Expérience}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="font-bold">Nombre total de competence</div>
                                <div className="font-bold">Nombre total de competence</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5">
                <div className="col-span-2">azertyu</div>
                <div className="col-span-3">zertyu</div>
            </div>
        </>
    );
}

export const emploiDetailsLoader = async ({ params }) => {
    const { id } = params;
    return id;
};

export default EmploiDetails;
