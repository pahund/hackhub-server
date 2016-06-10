/**
 * withAuthentication.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 07 Jun 2016
 */
const credentials = require("../../credentials.json");

module.exports = func => (req, res) => {
    if (req.hostname !== "localhost" && req.protocol !== "https") {
        res.status(403).json({ error: "SSL access only" });
        return;
    }
    if (!req.headers.authorization) {
        res.status(401).json({ error: "No credentials sent"});
        return;
    }
    const encoded = req.headers.authorization.split(' ')[1];
    const decoded = new Buffer(encoded, "base64").toString("utf8");
    const [ id, secret ] = decoded.split(":");
    if (credentials.id !== id || credentials.secret !== secret) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }
    func(req, res);
};
