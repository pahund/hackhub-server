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
const Achievement = require("../models/Achievement");
const Team = require("../models/Team");

Promise.promisifyAll(Team);
Promise.promisifyAll(Achievement);

module.exports = router => router.route("/update").get((req, res) =>
    Promise.all([
        Team.find(),
        Achievement.find()
    ]).then(([ teamList, achievementList ]) =>
        res.json({
            teams: teamList.reduce(
                (prev, { slackChannel, achievements, score }) => Object.assign(
                    {}, prev, {
                        [slackChannel]: {
                            score,
                            achievements
                        }
                    }
                ), {}
            ),
            achievements: achievementList.reduce(
                (prev, { codeName, available, teams }) => Object.assign(
                    {}, prev, {
                        [codeName]: {
                            available,
                            teams
                        }
                    }
                ), {}
            )
        })
    ).catch(err => res.status(500).json({
        message: `Failed to retrieve update data: ${err.message}`
    }))
);
