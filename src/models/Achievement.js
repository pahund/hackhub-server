/**
 * Achievement.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String, // "Gold", "Silver", "Bronze"
    available: Boolean
});

module.exports = mongoose.model("Achievement", AchievementSchema);
