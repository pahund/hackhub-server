/**
 * ScheduleItem.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 15 Jun 2016
 */
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    type: String,
    description: String
});

const ScheduleItemSchema = new mongoose.Schema({
    start: Number,
    end: Number,
    events: [EventSchema]
});

module.exports = mongoose.model("ScheduleItem", ScheduleItemSchema);
