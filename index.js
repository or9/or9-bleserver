#!/usr/bin/env node
"use strict";
// @flow

const noble = require("noble");
const { spawnSync } = require("child_process");
const { PIN_STATE } = require("./api");
const { SWITCH, 
	SENSOR, 
	BLENO_STATE, 
	PRIMARY_SERVICE_UUID, 
	ADVERTISED_NAME } = require("./const");

require("./peripheral");

// state = <"unknown" | "resetting" | "unsupported" | "unauthorized" | "poweredOff" | "poweredOn">
//
noble.on(NOBLE_STATE_CHANGED, onStateChange);
noble.on(NOBLE_SCAN_START, onScanStart);
noble.on(NOBLE_SCAN_STOP, onScanStop);
noble.on(NOBLE_PERIPHERAL_DISCOVERED, onPeripheralDiscovered);

function onStateChange (state) {
}

function onPeripheralDiscovered (peripheral) {
}

function onScanStart () {
}

function onScanStop () {
}


