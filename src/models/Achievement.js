/**
 * Achievement.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
    name: String,
    codeName: String,
    description: String,
    score: Number,
    available: Boolean,
    singleton: Boolean,
    teams: [ String ]
});

module.exports = mongoose.model("Achievement", AchievementSchema);
