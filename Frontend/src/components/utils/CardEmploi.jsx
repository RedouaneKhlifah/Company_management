import {
    Card,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import ANEPBtn from "./ANEPBtn";
import { Link } from "react-router-dom";

function CardEmploi({ data }) {
    const { Titre, Spécialité, Expérience, _id } = data.info_emploi;

    return (
        <Card className="static mt-6 max-w-96 bg-anep-secondary">
            <CardBody>
                <Typography className="font-bold font-cairo">
                    {Titre}
                </Typography>
                <div className="mb-2 flex items-center justify-between">
                    <Typography className="font-semibold font-cairo">
                        {Spécialité}
                    </Typography>
                    <Typography className="font-semibold font-cairo mx-4 whitespace-nowrap">
                        {Expérience}
                    </Typography>
                </div>
            </CardBody>
            <div className="flex-grow"></div>
            <CardFooter className="pt-0">
                <Link to={`/emploi/${_id}`} className="btn btn-primary">
                    <ANEPBtn name="explore" className="m-auto" />
                </Link>
            </CardFooter>
        </Card>
    );
}

export default CardEmploi;
