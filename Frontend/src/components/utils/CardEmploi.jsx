import {
    Card,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import ANEPBtn from "./ANEPBtn";
import { Link } from "react-router-dom";

function CardEmploi({ titre, specialite, exp, id }) {
    return (
        <Card className="mt-6 max-w-96 bg-anep-secondary">
            <CardBody>
                <Typography  className="font-bold font-cairo">
                    {titre}
                </Typography>
                <div className="mb-2 flex items-center justify-between">
                    <Typography
                        className="font-semibold font-cairo"
                    >
                        {specialite}
                    </Typography>
                    <Typography
                        className="font-semibold font-cairo mx-4 whitespace-nowrap"
                    >
                        {exp}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Link to={id} className="btn btn-primary">
                    <ANEPBtn name="explore" className="m-auto" />
                </Link>
            </CardFooter>
        </Card>
    );
}

CardEmploi.propTypes = {
    titre: PropTypes.string,
    specialite: PropTypes.string,
    exp: PropTypes.string
};

export default CardEmploi;
