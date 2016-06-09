/**
 * Team.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: String,
    slackChannel: String,
    hackers: [ String ],
    score: 0,
    achievements: [ String ],
    topic: String
});

module.exports = mongoose.model("Team", TeamSchema);


