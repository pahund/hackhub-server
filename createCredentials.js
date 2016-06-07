/**
 * createCredentials.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 07 Jun 2016
 */
const uuid = require("node-uuid");
const fs = require("fs");

const keyPair = {
    id: uuid.v4(),
    secret: uuid.v4()
};

fs.writeFile("credentials.json", JSON.stringify(keyPair), (err) => {
    if (err) {
        console.error("Error writing credentials file:", err);
        return;
    }
    console.log("Key pair created: ", keyPair);
});



