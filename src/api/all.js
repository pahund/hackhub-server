/**
 * all.js
 *
 * API call /api/all; returns an object with keys achievements, hackers, teams and topics, with the
 * full dataset for each collection.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05 Jun 2016
 */
const Promise = require("bluebird");

const Achievement = require("../models/Achievement");
const Hacker = require("../models/Hacker");
const Team = require("../models/Team");
const Topic = require("../models/Topic");
const ScheduleItem = require("../models/ScheduleItem");

Promise.promisifyAll(Achievement);
Promise.promisifyAll(Hacker);
Promise.promisifyAll(Team);
Promise.promisifyAll(Topic);
Promise.promisifyAll(ScheduleItem);

module.exports = router => router.route("/all").get((req, res) => {
    Promise.all([
        Achievement.find(),
        Hacker.find(),
        Team.find(),
        Topic.find(),
        ScheduleItem.find()
    ]).then(([
        achievements,
        hackers,
        teams,
        topics,
        scheduleItems
    ]) => res.json({
        achievements,
        hackers,
        teams,
        topics,
        scheduleItems
    })).catch(err => res.send(err));
});

