import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Home token={token} />} />

        <Route
          path="/login"
          element={<Login setToken={setToken} />}
        />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;