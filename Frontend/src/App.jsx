import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const GlobalVariables = React.createContext();

function App() {
    const [backendURL, setBackendURL] = useState("http://localhost:5000/");

    return (
        <>
            <GlobalVariables.Provider value={{ backendURL, setBackendURL }}>
                <Outlet />
                <ToastContainer />
            </GlobalVariables.Provider>
        </>
    );
}

export default App;
