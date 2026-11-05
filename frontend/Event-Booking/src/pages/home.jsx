import { useState, useEffect } from "react";
import "./Home.css";
import EventCard from "../components/EventCard";
function Home({ token }) {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        async function getEvents() {
            try {
                setLoading(true);

                const response = await fetch(
                    "http://localhost:8000/getEvent/",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch events");
                }

                setEvents(result.data || []);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getEvents();

    }, [token]);

    return (
        <div className="home">

            <section className="hero">
                <h1>Discover Events Around You</h1>
                <p>Find concerts, workshops, conferences and more.</p>
            </section>

            <section className="events">
                <h2>Featured Events</h2>

                {loading ? (
                    <p>Loading events...</p>
                ) : events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    events.map((event) => (
                        <EventCard
                            key={event._id}
                            event={event}
                        />
                    ))
                )}

            </section>

        </div>
    );
}

export default Home;