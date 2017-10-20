#!/usr/bin/env node
"use strict";
// @flow

// result codes: 
// 	Char.RESULT_SUCCESS
// 	Char.RESULT_INVALID_OFFSET
// 	Char.RESULT_INVALID_ATTRIBUTE_LENGTH
// 	Char.RESULT_UNLIKELY_ERROR

const { spawn } = require("child_process");
const PIN_STATE = require("./api");
var Char;

module.exports = (BlenoCharacteristic) => {
	Char = BlenoCharacteristic;

	return {
		onReadRequest: onReadRequest,
		onWriteRequest: onWriteRequest,
		onSubscribe: onSubscribe,
		onUnsubscribe: onUnsubscribe,
		onNotify: onNotify,
		onIndicate: onIndicate
	};
	
};

function onReadRequest (offset, callback) {
	console.log(`#onReadRequest \n\t${offset} \n\t${callback}`);
}

function onWriteRequest (data, offset, withoutResponse, callback) {
	console.log(`#onWriteRequest \n\t${data} \n\t${offset} \n\t${withoutResponse} \n\t${callback}`);
	PIN_STATE.SWITCH = PIN_STATE.SWITCH.toString() === "1"? "0": "1";
	console.info(`Toggled pin state to ${PIN_STATE.SWITCH}`);
	spawn("gpio", ["write", global.GPIO_PIN.SWITCH, PIN_STATE.SWITCH], { stdio: "inherit" });
}

function onSubscribe (maxValueSize, updateValueCallback) {
	console.log(`#onSubscribe \n\t${maxValueSize} \n\t${updateValueCallback}`);
}

function onUnsubscribe () {
	console.log(`#onUnsubscribe`);
}

function onNotify () {
	console.log(`#onNotify`);
}

function onIndicate () {
	console.log(`#onIndicate`);
}
