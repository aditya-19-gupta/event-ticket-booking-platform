import "./EventCard.css";

function EventCard({ event }) {
    return (
        <div className="event-card">

            <h3>{event.title}</h3>

            <p>{event.category}</p>

            <p>{event.description}</p>

            <p>{event.venue}</p>

            <p>{event.address}</p>

            <p>
                {new Date(event.startDate).toLocaleDateString()}
            </p>

            <button>View Details</button>

        </div>
    );
}

export default EventCard;