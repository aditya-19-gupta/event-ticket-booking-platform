const mongoose=require("mongoose");

const EventSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
        enum: [
            "concert",
            "conference",
            "workshop",
            "festival",
            "sports",
            "other",
        ],
    },

    bannerUrl: {
        type: String,
    },

    organizer: {
        // refernce id le rhe h user module se ki kon user h organizer
        type: mongoose.Schema.Types.ObjectId,   
        ref: "User",
        required: true,
    },

    venue: {
        type: String,
        required: true,
        trim: true,
    },

    address: {
        type: String,
        required: true,
        trim: true,
    },

    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
        required: true,
    },

    salesStart: {
        type: Date,
        required: true,
    },

    salesEnd: {
        type: Date,
        required: true,
    },

    status: {
        type: String,
        enum: ["draft", "published", "cancelled", "completed"],
        default: "draft",
    },
})

module.exports=mongoose.model("Event",EventSchema);