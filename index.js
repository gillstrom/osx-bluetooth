'use strict';
var execFile = require('child_process').execFile;
var fs = require('fs');
var bplistParser = require('bplist-parser');
var plist = require('plist');

function changeState(state, cb) {
	state = state === true ? 'on' : 'off';

	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	execFile('./bluetooth', state, {cwd: __dirname}, function (err) {
		if (err) {
			cb(err);
			return;
		}

		cb();
	});
}

function getState(cb) {
	var state;

	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	fs.readFile('/Library/Preferences/com.apple.Bluetooth.plist', function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		if (res.length < 1) {
			cb(new Error('This computer does not have Bluetooth'));
			return;
		}

		if (res[0] === 60) {
			state = plist.parse(res.toString()).ControllerPowerState;
		} else if (res[0] === 98) {
			state = bplistParser.parseBuffer(res)[0].ControllerPowerState;
		} else {
			cb(new Error('Could not get current Bluetooth state'));
			return;
		}

		cb(null, state === 1 ? true : false);
	});
}

exports.on = function (cb) {
	changeState(true, cb);
};

exports.off = function (cb) {
	changeState(false, cb);
};

exports.toggle = function (force, cb) {
	if (typeof force === 'boolean') {
		changeState(force, cb);
		return;
	}

	if (typeof force === 'function' && typeof cb !== 'function') {
		cb = force;
	}

	getState(function (err, state) {
		if (err) {
			cb(err);
			return;
		}

		changeState(!state, cb);
	});
};

exports.isOn = getState;
