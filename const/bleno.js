#!/usr/bin/env node
"use strict";
//@flow
module.exports = Object.freeze({
	STATE_CHANGE: "stateChange",
	AD_START: "advertisingStart",
	POWERED_ON: "poweredOn",
	AD_START_ERROR: "advertisingStartError",
	AD_STOP: "advertisingStop",
	ACCEPT: "accept",
	RSSI_UPDATE: "rssiUpdate",
	DISCONNECT: "disconnect"
});

