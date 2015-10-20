'use strict';
var execFile = require('child_process').execFile;
var fs = require('fs');
var bplistParser = require('bplist-parser');
var plist = require('plist');
var pify = require('pify');
var Promise = require('pinkie-promise');

function changeState(state) {
	state = state === true ? 'on' : 'off';

	if (process.platform !== 'darwin') {
		return Promise.reject(new Error('Only OS X systems are supported'));
	}

	return pify(execFile, Promise)('./bluetooth', [state], {cwd: __dirname});
}

function getState() {
	var state;

	if (process.platform !== 'darwin') {
		return Promise.reject(new Error('Only OS X systems are supported'));
	}

	return pify(fs.readFile, Promise)('/Library/Preferences/com.apple.Bluetooth.plist').then(function (res) {
		if (res.length < 1) {
			return Promise.reject(new Error('This computer does not have Bluetooth'));
		}

		if (res[0] === 60) {
			state = plist.parse(res.toString()).ControllerPowerState;
		} else if (res[0] === 98) {
			state = bplistParser.parseBuffer(res)[0].ControllerPowerState;
		} else {
			return Promise.reject(new Error('Could not get current Bluetooth state'));
		}

		return state === 1;
	});
}

exports.on = function () {
	return changeState(true);
};

exports.off = function () {
	return changeState(false);
};

exports.toggle = function (force) {
	if (typeof force === 'boolean') {
		return changeState(force);
	}

	return getState().then(function (state) {
		return changeState(!state);
	});
};

exports.isOn = getState;
