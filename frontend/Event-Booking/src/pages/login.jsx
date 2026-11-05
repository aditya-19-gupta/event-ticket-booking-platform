import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router";
function Login({ setToken }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:8000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            setToken(result.accessToken);

            navigate("/");

        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p className="login-subtitle">Login to your Event Booking account</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="login-message">{message}</p>
            </div>
        </div>
    );
}

export default Login;