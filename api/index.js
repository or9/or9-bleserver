#!/usr/bin/env node
"use strict";
// @flow

const { spawnSync } = require("child_process");
const { SWITCH, SENSOR } = require("../const");

module.exports.PIN_STATE = Object.freeze({
	get SWITCH () {
		return spawnSync("gpio", ["read", SWITCH], { stdio: "pipe" }).stdout.toString();
	},
	get SENSOR () {
		return spawnSync("gpio", ["read", SENSOR], { stdio: "pipe" }).stdout.toString();
	},
	get isDoorOpen () {
		return !parseInt(this.SENSOR);
	}
});

