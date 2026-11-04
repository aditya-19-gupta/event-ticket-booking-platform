import { NavLink } from "react-router";

function Navbar() {
    return (
        <nav>
            <h2>Event Booking</h2>

            <NavLink to="/">Home</NavLink>

            <NavLink
                to="/login"
                style={({ isActive }) => ({
                    color: isActive ? "red" : "black"
                })}
            >
                Login
            </NavLink>

            <NavLink
                to="/register"
                style={({ isActive }) => ({
                    color: isActive ? "red" : "black"
                })}
            >
                Register
            </NavLink>
        </nav>
    );
}

export default Navbar;