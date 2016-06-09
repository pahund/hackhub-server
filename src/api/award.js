/**
 * award.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 09 Jun 2016
 */
const withAuthentication = require("../util/withAuthentication");
const Promise = require("bluebird");
const Team = require("../models/Team");
const Achievement = require("../models/Achievement");

Promise.promisifyAll(Achievement);
Promise.promisifyAll(Team);

module.exports = router => router.route("/award/:codeName/:slackChannel").put(
    withAuthentication((req, res) => {
        const { codeName, slackChannel } = req.params;
        Promise.all([
            findAchievement(codeName, slackChannel),
            findTeam(codeName, slackChannel)
        ]).then(([
            achievement,
            team
        ]) => {
            if (!achievement.available) {
                throwError(codeName, slackChannel, "singleton achievement has already been awarded");
            }
            if (team.achievements.includes(codeName)) {
                throwError(codeName, slackChannel, "achievement has already been awarded to this team");
            }
            team.achievements.push(achievement.codeName);
            team.score += achievement.score;
            if (achievement.singleton) {
                achievement.available = false;
            }
            achievement.teams.push(slackChannel);
            Promise.all([
                team.save(),
                achievement.save()
            ]).then(() => {
                const message = `Achievement “${codeName}” was awarded to team “${slackChannel}”`;
                console.info(message);
                res.json({ message });
            }).catch(err => res.status(500).json({ message:
                createErrorMessage(codeName, slackChannel, `saving in database failed: ${err.message}`)
            }));
        }).catch(err => {
            res.status(400).json({ message: err.message });
        });
    })
);

function throwError(codeName, slackChannel, message) {
    throw new Error(createErrorMessage(codeName, slackChannel, message));
}

function createErrorMessage(codeName, slackChannel, message) {
    return `Failed to award achievement “${codeName}” to team “${slackChannel}” – ${message}`;
}

function findAchievement(codeName, slackChannel) {
   return Achievement.findOne({ codeName }).then(achievement => {
       if (achievement === null) {
           throwError(codeName, slackChannel, "unknown achievement");
       }
       return achievement;
   })
}

function findTeam(codeName, slackChannel) {
    return Team.findOne({ slackChannel }).then(team => {
        if (team === null) {
            throwError(codeName, slackChannel, "unknown team");
        }
        return team;
    });
}
