import CardEmploi from "../../components/CardEmploi";
function Emploi() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
                <CardEmploi 
                    titre="azerty"
                    specialite="ing"
                    exp="5" 
                />
                <CardEmploi />
                <CardEmploi />
                <CardEmploi />
                <CardEmploi />
                <CardEmploi />
            <div className="">
                7
            </div>
            <div className="">
                8
            </div>
            <div className="">
                9
            </div>
            <div className="">
                10
            </div>
            <div className="">
                11
            </div>
            <div className="">
                12
            </div>
        </div>
    );
}

export default Emploi;
