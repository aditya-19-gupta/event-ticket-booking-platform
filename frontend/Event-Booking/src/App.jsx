import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/home.jsx";
import Login from "../pages/login.jsx"
import Register from "../pages/register.jsx"
import Navbar from "./components/navbar";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;