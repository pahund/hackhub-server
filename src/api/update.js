/**
 * update.js
 *
 * API call /api/update; returns a json object where the keys are the hackers' user names and the
 * values are the hackers' scores.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05 Jun 2016
 */
const Promise = require("bluebird");

const Hacker = require("../models/Hacker");

Promise.promisifyAll(Hacker);

module.exports = router => router.route("/update").get((req, res) =>
    Hacker.find().then(
        hackers => res.json(hackers.reduce(
            (prev, curr) => Object.assign({}, prev, { [curr.userName]: curr.score }), {}
        ))
    ).catch(err => res.send(err))
);
