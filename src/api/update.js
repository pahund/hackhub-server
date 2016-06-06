/**
 * update.js
 *
 * API call /api/update; returns a json object where the keys are the teams' slack channel names and the
 * values are the teams' scores.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05 Jun 2016
 */
const Promise = require("bluebird");

const Team = require("../models/Team");

Promise.promisifyAll(Team);

module.exports = router => router.route("/update").get((req, res) =>
    Team.find().then(
        teams => res.json(teams.reduce(
            (prev, curr) => Object.assign({}, prev, { [curr.slackChannel]: curr.score }), {}
        ))
    ).catch(err => res.send(err))
);
