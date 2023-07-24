import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
// import PropTypes from "prop-types";

function CardEmploi({titre, specialite, exp}) {
    return (
        <Card className="mt-6 w-96 bg-anep-secondary" >
            <CardBody>
                <Typography
                    color="anep-light"
                    className="font-bold font-cairo"
                >
                    {titre}
                </Typography>
                <div className="mb-2 flex items-center justify-between">
                    <Typography
                        color="anep-dark"
                        className="font-semibold font-cairo"
                    >
                        {specialite}
                    </Typography>
                    <Typography
                        color="anep-primary"
                        className="font-semibold font-cairo"
                    >
                        {exp} ans
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    ripple={false}
                    fullWidth={false}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}

// CardEmploi.propTypes = {
//     titre: propTypes.string,
//     specialite: propTypes.string,
//     exp: propTypes.string
// }

export default CardEmploi;
