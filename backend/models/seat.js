const mongoose=require("mongoose");

const seatSchema=new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },

    seatNumber: {
        type: String,
        required: true,
        trim: true,
    },

    section: {
        type: String,
        required: true,
        enum: ["regular", "premium", "vip"],
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    status: {
        type: String,
        enum: ["available", "held", "sold"],
        default: "available",
    },
})

module.exports=mongoose.model("Seat",seatSchema);


// event or seat to combine karta h ,ek seat 2 log ko na mil jaye 
seatSchema.index(
    { event: 1, seatNumber: 1 },
    { unique: true }
);