/**
 * bump.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const Team = require("../models/Team");
const withAuthentication = require("../util/withAuthentication");

module.exports = router => router.route("/bump/:slackChannel").put(
    withAuthentication((req, res) => {
        Team.findOne({ slackChannel: req.params.slackChannel }, (err, team) => {
            if (err) {
                res.send(err);
                return;
            }
            team.score++;
            team.save(err => {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({
                    message: `Score of team ${team.name} bumped to ${team.score}`
                });
            });
        });
    })
);

