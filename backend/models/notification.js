
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
    },

    type: {
        type: String,
        enum: [
            "email_verification",
            "password_reset",
            "ticket_confirmation",
            "event_reminder",
            "refund_confirmation",
        ],
        required: true,
    },

    recipient: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["pending", "sent", "failed"],
        default: "pending",
    },

    attempts: {
        type: Number,
        default: 0,
        min: 0,
    },

    lastError: {
        type: String,
    },

    sentAt: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
