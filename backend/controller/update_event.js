
const event = require("../models/event");
const mongoose = require("mongoose");
const {redis}=require("../config/redis");
async function update(req, res) {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Event ID"
            });
        }

        const data = await event.findById(id);

        if (!data) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if (data.organizer.toString() !== userId) {
            return res.status(403).json({
                message: "You do not own this event"
            });
        }

        const {
            title, description, category, bannerUrl,
            venue, address, startDate, endDate,
            salesStart, salesEnd
        } = req.body;

        if (
            !title || !description || !category || !venue ||
            !address || !startDate || !endDate ||
            !salesStart || !salesEnd
        ) {
            return res.status(400).json({
                message: "Required event fields are missing"
            });
        }

        const updatedEvent = await event.findByIdAndUpdate(
            id,
            {
                title,
                description,
                category,
                bannerUrl,
                venue,
                address,
                startDate,
                endDate,
                salesStart,
                salesEnd
            },
            { new: true, runValidators: true }
        );
        await redis.del(`event${id}`);
        await redis.del("event:published");


        return res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = update;
