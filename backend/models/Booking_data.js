const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    seats: [
        {
            seatId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Seat",
                required: true
            },

            seatNumber: {
                type: String,
                required: true
            },

            price: {
                type: Number,
                required: true,
                min: 0
            },
            status:{
                type:String,
                enum:["Booked","Cancelled","Pending"],
                default:"Pending",
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "expired"],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    refundedAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    refundstatus:{
        type:String,
        enum:["successfull","pending","failed"],
        default:null
    }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);