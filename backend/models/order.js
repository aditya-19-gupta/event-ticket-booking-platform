const mongoose=require("mongoose");

const orederSchema=new mongoose.Schema({
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

    seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
        required: true,
    }],

    totalAmount: {
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
        enum: ["pending", "confirmed", "cancelled", "expired"],
        default: "pending",
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "succeeded", "failed", "refunded"],
        default: "pending",
    },
},
{timestamps:true}
)
module.exports=mongoose.model("Order",orderSchema)