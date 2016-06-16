/**
 * schedule.js
 *
 * API call /api/schedule; returns an array of schedule items.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16 Jun 2016
 */
const Promise = require("bluebird");

const ScheduleItem = require("../models/ScheduleItem");

Promise.promisifyAll(ScheduleItem);

module.exports = router => router.route("/schedule").get((req, res) =>
    ScheduleItem.find().then(scheduleItems => res.json(scheduleItems)).catch(err => res.send(err))
);
