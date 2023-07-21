import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Accueil from "./views/Accueil";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
