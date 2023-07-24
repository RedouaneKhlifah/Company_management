import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import {
    createBrowserRouter,
    BrowserRouter,
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
import CompetenceHome from "./views/children/skills/CompetenceHome.jsx";

// loaders
import { fetchAllCompetences } from "./loaders/Competences.js";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            {/* Routes if user is authentified */}
            <Route path="" element={<Home />}>
                <Route index element={<Accueil />} />

                <Route path="jobs" element={<Emploi />}></Route>

                <Route path="employees" element={<Employe />}>
                    <Route index element={<EmployeHome />} />
                    <Route
                        path=":id"
                        element={<EmployeDetails />}
                        loader={employeDetailsLoader}
                    />
                </Route>

                <Route path="competence" element={<Competence />}>
                    <Route
                        index
                        element={<CompetenceHome />}
                        loader={fetchAllCompetences}
                    />
                </Route>

                <Route path="modules" element={<Module />}></Route>
            </Route>

            {/* Route to Sign-in page */}
            <Route path="signin" element={<SignIn />} />

            {/* Route to Page not found */}
            <Route path="*" element={<PageNotFound />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);
