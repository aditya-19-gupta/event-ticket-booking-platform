
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },

    seat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
        required: true,
    },
    // unique code for each ticket
    ticketCode: {
        type: String,
        required: true,
        unique: true,
    },

    status: {
        type: String,
        enum: ["valid", "used", "cancelled"],
        default: "valid",
    },
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
