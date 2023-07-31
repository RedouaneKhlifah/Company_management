import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import ANEPBtn from "./ANEPBtn";

function CardEmployee({name, avatar, grade, state, jobs, id}) {
    return (
        <div className="p-4 flex flex-col justify-between items-stretch gap-y-6 bg-anep-secondary rounded-lg drop-shadow-md">
            <div className="flex justify-between items-center gap-x-3">
                <Avatar
                    src={avatar}
                    alt={`Avatar de ${name}`}
                    size="xxl"
                />
                <div>
                    <h2 className="text-xl text-black font-bold">
                        {name}
                    </h2>
                    <h3 className="text-anep-dark font-semibold">
                        {grade}
                    </h3>
                    <p className="text-sm font-medium">
                        <span className="font-bold">État:</span> {state}
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-between items-start gap-y-2 child:px-2.5 child:py-1 child:bg-blue-100 child:border child:border-blue-300 child:rounded-full">
                {jobs.map((job, i) => <h4 key={i}>{job}</h4> )}
            </div>
            <div className="flex justify-center">
                <Link to={id} className="rounded-lg">
                    <ANEPBtn name="Explorer le profil" />
                </Link>
            </div>
        </div>
    );
}

export default CardEmployee;
