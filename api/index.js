#!/usr/bin/env node
"use strict";
// @flow

const { spawnSync } = require("child_process");
const { SWITCH, SENSOR } = require("../const");
const STDIO = Object.freeze([
	"pipe",
	"pipe",
	2
]);
const CMD = "gpio";

module.exports.PIN_STATE = Object.freeze({
	get SWITCH () {
		return spawnSync(CMD, ["read", SWITCH], { stdio: STDIO }).stdout.toString();
	},
	get SENSOR () {
		return spawnSync(CMD, ["read", SENSOR], { stdio: STDIO }).stdout.toString();
	},
	get isDoorOpen () {
		return !parseInt(this.SENSOR);
	}
});

