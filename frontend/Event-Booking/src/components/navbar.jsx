import { NavLink, useNavigate } from "react-router";
import "./Navbar.css";

function Navbar({ token, setToken }) {
    const navigate = useNavigate();

    function handleLogout() {
        setToken(null);
        navigate("/");
    }

    return (
        <nav className="navbar">
            <h2>Event Booking</h2>

            <div className="navbar-links">
                <NavLink to="/">Home</NavLink>

                {token ? (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;