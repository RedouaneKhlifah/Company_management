import { Input } from "@material-tailwind/react";

function SignIn() {
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
                    <form action="">
                        <div className="min-w-[240px] sm:min-w-[300px] flex flex-col items-center content-center gap-y-4">
                            <Input
                                label="E-mail"
                                type="email"
                                size="lg"
                                required
                                className="focus:ring-0"
                                // containerProps={{ className: "min-w-[300px]" }}
                            />
                            <Input
                                label="Mot de passe"
                                type="password"
                                size="lg"
                                required
                                className="focus:ring-0"
                            />
                            <button className="bg-anep-secondary px-6 py-1.5 rounded-lg border border-anep-primary">
                                Submit
                            </button>
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
