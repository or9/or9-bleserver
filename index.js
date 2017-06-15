#!/usr/bin/env node
"use strict";

const bleno = require("bleno");
const handler = require("./handler")(bleno.Characteristic);
const STATE = {
	STATE_CHANGE: "stateChange",
	AD_START: "advertisingStart",
	POWERED_ON: "poweredOn",
	AD_START_ERROR: "advertisingStartError",
	AD_STOP: "advertisingStop",
	ACCEPT: "accept",
	RSSI_UPDATE: "rssiUpdate",
	DISCONNECT: "disconnect"
};
const PRIMARY_SERVICE_UUID = "fffffffffffffffffffffffffffffff0";
const ADVERTISED_NAME = "garbage body rattle balls";
process.env.BLENO_DEVICE_NAME = process.env.BLENO_DEVICE_NAME || ADVERTISED_NAME;
// process.env.BLENO_ADVERTISING_INTERVAL

bleno.on(STATE.AD_START, adStart);
bleno.on(STATE.STATE_CHANGE, stateChanged);
bleno.on(STATE.AD_START_ERROR, adStartError);
bleno.on(STATE.AD_STOP, adStop);
bleno.on(STATE.ACCEPT, accept);
bleno.on(STATE.RSSI_UPDATE, rssiUpdate);
bleno.on(STATE.DISCONNECT, disconnect);
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
	if (state === STATE.POWERED_ON) {
		console.info(`Start advertising ${ADVERTISED_NAME}`);
		bleno.startAdvertising(ADVERTISED_NAME, PRIMARY_SERVICE_UUID);
	} else {
		console.info(`Stop advertising. State is not ${STATE.POWERED_ON}`);
		bleno.stopAdvertising();
	}
}
