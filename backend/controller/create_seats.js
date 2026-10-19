
const Seat = require("../models/seat");
const mongoose = require("mongoose");
const Event = require("../models/event");

async function Create_seat(req, res) {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const seats = req.body;

        // Validate Event ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Event ID"
            });
        }

        // Check if event exists
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Check event ownership
        if (event.organizer.toString() !== userId) {
            return res.status(403).json({
                message: "You do not own this event"
            });
        }

        // Validate request body
        if (!Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({
                message: "Provide a non-empty array of seats"
            });
        }

        // Prepare seats
        const seatData = seats.map((item) => ({
            event: id,
            seatNumber: item.seatNumber,
            section: item.section,
            price: item.price
        }));

        // Insert all seats
        const createdSeats = await Seat.insertMany(seatData);

        return res.status(201).json({
            message: "Seats added successfully",
            count: createdSeats.length,
            data: createdSeats
        });

    } catch (err) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(409).json({
                message: "Duplicate seat number for this event"
            });
        }

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = Create_seat;
