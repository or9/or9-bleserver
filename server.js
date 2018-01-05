#!/usr/bin/env node
"use strict";
// @flow

const noble = require("noble");
const {
	STATE_CHANGED: "stateChanged",
	SCAN_START: "scanStart",
	SCAN_STOP: "scanStop",
	PERIPHERAL_DISCOVERED: "discover"
} = require("./const/noble");

// state = <"unknown" | "resetting" | "unsupported" | "unauthorized" | "poweredOff" | "poweredOn">
//
noble.on(STATE_CHANGED, onStateChange);
noble.on(SCAN_START, onScanStart);
noble.on(SCAN_STOP, onScanStop);
noble.on(PERIPHERAL_DISCOVERED, onPeripheralDiscovered);

function onStateChange (state) {
}

function onPeripheralDiscovered (peripheral) {
}

function onScanStart () {
}

function onScanStop () {
}


