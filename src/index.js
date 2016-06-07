/**
 * index.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03 Jun 2016
 */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bump = require("./api/bump");
const all = require("./api/all");
const update = require("./api/update");

mongoose.connect("mongodb://localhost:27017/hackhub");

const router = express.Router();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get("/", (req, res) => res.json({ message: "Welcome to the HackHub API!" }));

bump(router);
all(router);
update(router);

app.use("/api/", router);

app.listen(port);

console.log(`API is running on port ${port}`);

