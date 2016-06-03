/**
 * hacker.js
 *
 * @author <a href="mailto:pahund@hacker.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const Hacker = require("../models/Hacker");

module.exports = router => {
    router.route("/hackers").get((req, res) =>
        Hacker.find((err, hackers) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(hackers)
        })
    );

    router.route("/hackers").post((req, res) => {
        const hacker = new Hacker();
        hacker.name = req.body.name;
        hacker.userName = req.body.userName;
        hacker.businessUnit = req.body.businessUnit;
        hacker.description = req.body.description;
        hacker.score = req.body.score;
        hacker.save(err => {
            if (err) {
                res.send(err);
                return;
            }
            res.json({
                message: `Hacker ${hacker.name} created`
            });
        });
    });

    router.route("/hackers/:id").put((req, res) => {
        Hacker.findById(req.params.id, (err, hacker) => {
            if (err) {
                res.send(err);
                return;
            }

            [ "name", "userName", "businessUnit", "description", "score" ].forEach(prop => {
                if (req.body[prop] !== undefined) {
                    hacker[prop] = req.body[prop];
                }
            });

            hacker.save(err => {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({
                    message: `Hacker ${hacker.name} updated`
                });
            });
        });
    });

    router.route("/hackers/:id").delete((req, res) => {
        Hacker.remove({
            _id: req.params.id
        }, err => {
            if (err) {
                res.send(err);
                return;
            }
            res.json({
                message: "Hacker deleted"
            });
        });
    });

    router.route("/hackers/:id").get((req, res) => {
        Hacker.findById(req.params.id, (err, hacker) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(hacker);
        });
    });
};
