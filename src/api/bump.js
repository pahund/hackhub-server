/**
 * bump.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const Hacker = require("../models/Hacker");

module.exports = router => router.route("/bump/:id").put((req, res) => {
    Hacker.findById(req.params.id, (err, hacker) => {
        if (err) {
            res.send(err);
            return;
        }
        hacker.score++;
        hacker.save(err => {
            if (err) {
                res.send(err);
                return;
            }
            res.json({
                message: `Score of hacker ${hacker.name} bumped to ${hacker.score}`
            });
        });
    });
});

