#!/usr/bin/env node
"use strict";
// @flow

const { spawnSync } = require("child_process");
const bleno = require("bleno");
const handler = require("./handler")(bleno.Characteristic);
const { PIN_STATE } = require("./api");
const { SWITCH, 
	SENSOR, 
	BLENO_STATE, 
	PRIMARY_SERVICE_UUID, 
	ADVERTISED_NAME } = require("./const");
global.GPIO_PIN = { SWITCH, SENSOR };

// Toggle switch (pin 29) mode to out
spawnSync("gpio", ["mode", GPIO_PIN.SWITCH, "out"], { stdio: "inherit" });

// Read initial pin states
const initialSwitchState = PIN_STATE.SWITCH;
const initialDoorState = PIN_STATE.isDoorOpen;

console.info(`Initial pin ${SWITCH} state ${PIN_STATE.SWITCH}`);
console.info(`Initial door state ${SENSOR} state ${PIN_STATE.SENSOR}`);

process.env.BLENO_DEVICE_NAME = process.env.BLENO_DEVICE_NAME || ADVERTISED_NAME;
// process.env.BLENO_ADVERTISING_INTERVAL

bleno.on(BLENO_STATE.AD_START, adStart);
bleno.on(BLENO_STATE.STATE_CHANGE, stateChanged);
bleno.on(BLENO_STATE.AD_START_ERROR, adStartError);
bleno.on(BLENO_STATE.AD_STOP, adStop);
bleno.on(BLENO_STATE.ACCEPT, accept);
bleno.on(BLENO_STATE.RSSI_UPDATE, rssiUpdate);
bleno.on(BLENO_STATE.DISCONNECT, disconnect);
// bleno.updateRssi([callback(error, rssi)]);

function adStartError (err) {
	console.info(`~adStartError ${err}`);
}
function adStop () {
	console.info(`~advertisingStop`);
}
function accept (clientAddress) {
	console.info(`~accept ${clientAddress}`);
}
function rssiUpdate (rssi) {
	console.info(`~rssiUpdate ${rssi}`);
}

function disconnect (clientAddress) {
	console.info(`~disconnect ${clientAddress}`);
}

function adStart (error) {
	console.info(`~advertisingStart ${error}`);
	const descriptorConfig = { 
		uuid: "2901",
		value: "some descriptor val"
	};
	const descriptor = new bleno.Descriptor(descriptorConfig);
	const characteristicConfig = {
		uuid: "fff1",
		properties: [ "read", "write", "writeWithoutResponse" ],
		//value: "ff", // optional static value, must be of type Buffer - for read only characteristics
		descriptors: [ descriptor ],
		onReadRequest: handler.onReadRequest,
		onWriteRequest: handler.onWriteRequest,
		onSubscribe: handler.onSubscribe,
		onUnsubscribe: handler.onUnsubscribe,
		onNotify: handler.onNotify,
		onIndicate: handler.onIndicate
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
	console.info(`BLE state changed ${state}`);
	if (state === BLENO_STATE.POWERED_ON) {
		console.info(`Start advertising ${ADVERTISED_NAME}`);
		bleno.startAdvertising(ADVERTISED_NAME, PRIMARY_SERVICE_UUID);
	} else {
		console.info(`Stop advertising. State is not ${BLENO_STATE.POWERED_ON}`);
		bleno.stopAdvertising();
	}
}

