#!/usr/bin/env node
"use strict";
// @flow

const { spawnSync } = require("child_process");
const { SWITCH, SENSOR } = require("../const");
const STDIO = Object.freeze([
	"pipe",
	1,
	2
]);

module.exports.PIN_STATE = Object.freeze({
	get SWITCH () {
		return spawnSync("gpio", ["read", SWITCH], { stdio: STDIO }).stdout.toString();
	},
	get SENSOR () {
		return spawnSync("gpio", ["read", SENSOR], { stdio: STDIO }).stdout.toString();
	},
	get isDoorOpen () {
		return !parseInt(this.SENSOR);
	}
});

