import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import Accueil from "./views/children/Accueil";
import Emploi from "./views/children/Emploi";
import Employe from "./views/children/Employe.jsx";
import Competence from "./views/children/Competence";
import Module from "./views/children/Module";
import EmployeHome from "./views/children/employees/EmployeHome.jsx";
import EmployeDetails, {
    employeDetailsLoader
} from "./views/children/employees/EmployeDetails.jsx";
import PageNotFound from "./views/PageNotFound";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CompetenceHome from "./views/children/skills/CompetenceHome.jsx";
import ModuleHome from "./views/children/courses/ModuleHome.jsx";
import EmploiHome from "./views/children/jobs/EmploiHome.jsx";
import EmploieDetails from "./views/children/jobs/EmploiDetails.jsx";
import ForgotPassword from "./views/ForgotPassword.jsx";
// loaders
import { fetchCompetences } from "./loaders/Competences.js";
import { fetchModules } from "./loaders/Modules.js";
import { fetchEmploi } from "./loaders/Emplois.js";
// import EmploiDetails, {
//     emploiDetailsLoader
// }  from "./views/children/employees/EmploiDetails.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            {/* Routes if user is authentified */}
            <Route path="" element={<PrivateRoute />}>
                <Route path="" element={<Home />}>
                    <Route index element={<Accueil />} />

                    <Route path="emplois" element={<Emploi />}>
                        <Route
                            index
                            element={<EmploiHome />}
                        />
                        <Route

                            path=":id"
                            element={<EmploieDetails />}
                       />
                    </Route>

                    <Route path="employees" element={<Employe />}>
                        <Route index element={<EmployeHome />} />
                        <Route
                            path=":id"
                            element={<EmployeDetails />}
                            loader={employeDetailsLoader}
                        />
                    </Route>

                    <Route path="competences" element={<Competence />}>
                        <Route
                            index
                            element={<CompetenceHome />}
                            loader={fetchCompetences}
                        />
                    </Route>

                    <Route path="modules" element={<Module />}>
                        <Route
                            index
                            element={<ModuleHome />}
                            loader={fetchModules}
                        />
                    </Route>
                </Route>

                {/* Route to Page not found */}
                <Route path="*" element={<PageNotFound />} />
            </Route>

            {/* Route to Sign-in page */}
            <Route path="signin" element={<SignIn />} />

            {/* Route to Forgot password page */}
            <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </React.StrictMode>
    </Provider>
);
