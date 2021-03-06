/**
 * Topic.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    name: String,
    codeName: String,
    description: String,
    submitter: String,
    teams: [ String ],
    wikiUrl: String
});

module.exports = mongoose.model("Topic", TopicSchema);

