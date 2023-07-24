import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import ANEPBtn from "../components/utils/ANEPBtn";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const loginHandler = async (evt) => {
        evt.preventDefault();
        setError(false);

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({...res}));
            navigate("/");
        } catch (err) {
            setError(true);
            toast.error(err.data.message);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-anep-secondary">
            <div className="md-max:mx-3 md-max:max-w-[500px] container lg:w-[980px] flex md-max:justify-center border border-gray-400 rounded-lg overflow-hidden bg-white">
                <div className="md:w-1/2 md-max:h-[600px] px-3 flex flex-col items-center justify-center gap-y-14 md:gap-y-10 lg:gap-y-20">
                    <img
                        className="h-16"
                        src="../src/assets/images/logo/logo-anep-flat.png"
                        alt="ANEP logo"
                    />
                    <h1 className="text-anep-primary text-3xl lg:text-5xl font-bold">
                        Login
                    </h1>
                    <p className="text-anep-dark lg:text-lg text-center font-medium">
                        Veuillez vous connecter pour accéder à la plateforme.
                    </p>
                    <form onSubmit={loginHandler}>
                        <div className="min-w-[240px] sm:min-w-[300px] flex flex-col items-center content-center gap-y-4">
                            <Input
                                label="E-mail"
                                type="email"
                                size="lg"
                                required
                                error={error}
                                className="focus:ring-0"
                                value={email}
                                onChange={(evt) => setEmail(evt.target.value)}
                            />
                            <Input
                                label="Mot de passe"
                                type="password"
                                size="lg"
                                required
                                error={error}
                                className="focus:ring-0"
                                value={password}
                                onChange={(evt) =>
                                    setPassword(evt.target.value)
                                }
                            />
                            <ANEPBtn
                                name="LOGIN"
                                color="blue"
                                icon="material-symbols:login-rounded"
                            />
                        </div>
                    </form>
                </div>
                <div className="w-1/2 border-l border-gray-400 bg-[url('../src/assets/images/anep-signin-bg.jpg')] bg-no-repeat bg-cover hidden md:block">
                    <img
                        className="min-h-full min-w-full object-cover drop-shadow-white-sm"
                        src="../src/assets/images/ANEP-2023-min.png"
                        alt="ANEP Highlights"
                    />
                </div>
            </div>
        </main>
    );
}

export default SignIn;
