#!/usr/bin/env node
"use strict";

const bleno = require("bleno");
const STATE = {
	STATE_CHANGE: "stateChange",
	AD_START: "advertisingStart",
	POWERED_ON: "poweredOn"
};
const PRIMARY_SERVICE_UUID = "fffffffffffffffffffffffffffffff0";
const ADVERTISED_NAME = "garbage body rattle balls";

bleno.on(STATE.AD_START, adStart);
bleno.on(STATE.STATE_CHANGE, stateChanged);

function adStart (error) {
	const descriptorConfig = { 
		uuid: "2901",
		value: "some descriptor val"
	};
	const descriptor = new bleno.Descriptor(descriptorConfig);
	const characteristicConfig = {
		uuid: "fff1",
		properties: [ "read", "write", "writeWithoutResponse" ],
		//value: "ff", // optional {Buffer}
		descriptors: [ descriptor ]
	};
	const characteristic = new bleno.Characteristic(characteristicConfig);
	const primaryServiceConfig = {
		uuid: PRIMARY_SERVICE_UUID,
		characteristics: [ characteristic ]
	};
	const services = new bleno.PrimaryService(primaryServiceConfig);
	bleno.setServices(services);
}

function stateChanged (state) {
	console.log(`BLE state changed ${state}`);
	if (state === STATE.POWERED_ON) {
		console.info(`Start advertising ${ADVERTISED_NAME}`);
		bleno.startAdvertising(ADVERTISED_NAME, PRIMARY_SERVICE_UUID);
	} else {
		console.info(`Stop advertising. State is not ${STATE.POWERED_ON}`);
		bleno.stopAdvertising();
	}
}
