
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
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
    // payment gateway 
    gateway: {
        type: String,
        enum: ["razorpay"],
        default: "razorpay",
    },

    gatewayPaymentId: {
        type: String,
    },

    amount: {
        type: Number,
        required: true,
        min: 0,
    },

    currency: {
        type: String,
        default: "INR",
    },

    status: {
        type: String,
        enum: ["pending", "succeeded", "failed", "refunded"],
        default: "pending",
    },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
