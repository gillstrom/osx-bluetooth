'use strict';
var fs = require('fs');
var execFile = require('child_process').execFile;
var bplistParser = require('bplist-parser');
var plist = require('plist');

exports.set = function (state, cb) {
	if (process.platform !== 'darwin') {
		throw new Error('Only OS X systems are supported');
	}

	if (!Number(state) && state !== 0) {
		throw new Error('First argument has to be a number');
	}

	if (state !== 1 && state !== 0) {
		throw new Error('First argument has to be 1 or 0');
	}

	execFile('./bluetooth', [(state === 1 ? 'on' : 'off')], {cwd: __dirname}, function (err) {
		if (err) {
			cb(err);
			return;
		}

		cb();
	});
};

exports.get = function (cb) {
	fs.readFile('/Library/Preferences/com.apple.Bluetooth.plist', function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		if (res.length < 1) {
			cb(new Error('This computer does not have Bluetooth'));
			return;
		}

		var state;

		if (res[0] === 60) {
			state = plist.parse(res.toString()).ControllerPowerState;
		} else if (res[0] === 98) {
			state = bplistParser.parseBuffer(res)[0].ControllerPowerState;
		} else {
			cb(new Error('Could not get current Bluetooth state'));
			return;
		}

		cb(null, state);
	});
};
