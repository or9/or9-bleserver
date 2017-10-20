#!/usr/bin/env node
"use strict";
// @flow

const { spawnSync } = require("child_process");

module.exports = Object.freeze({
	get SWITCH () {
		return spawnSync("gpio", ["read", SWITCH], { stdio: "inherit" });
	},
	get SENSOR () {
		return spawnSync("gpio", ["read", SENSOR], { stdio: "inherit" });
	},
	get isDoorOpen () {
		return !parseInt(this.SENSOR);
	}
});

