/**
 * Hacker.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const mongoose = require("mongoose");

const HackerSchema = new mongoose.Schema({
    name: String,
    userName: String,
    description: String,
    isSubmitter: Boolean,
    topic: String,
    teams: [ String ]
});

module.exports = mongoose.model("Hacker", HackerSchema);

