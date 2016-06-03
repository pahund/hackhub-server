/**
 * teams.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const Team = require("../models/Team");

module.exports = router => {
    router.route("/teams").get((req, res) =>
        Team.find((err, teams) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(teams)
        })
    );

    router.route("/teams").post((req, res) => {
        const team = new Team();
        team.name = req.body.name;
        team.slackChannel = req.body.slackChannel;
        team.save(err => {
            if (err) {
                res.send(err);
                return;
            }
            res.json({
                message: `Team ${team.name} created`
            });
        });
    });

    router.route("/teams/:id").put((req, res) => {
        Team.findById(req.params.id, (err, team) => {
            if (err) {
                res.send(err);
                return;
            }

            ["name", "slackChannel"].forEach(prop => {
                if (req.body[prop] !== undefined) {
                    team[prop] = req.body[prop];
                }
            });

            team.save(err => {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({
                    message: `Team ${team.name} updated`
                });
            });
        });
    });

    router.route("/teams/:id").delete((req, res) => {
        Team.remove({
            _id: req.params.id
        }, err => {
            if (err) {
                res.send(err);
                return;
            }
            res.json({
                message: "Team deleted"
            });
        });
    });

    router.route("/teams/:id").get((req, res) => {
        Team.findById(req.params.id, (err, team) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(team);
        });
    });
};
