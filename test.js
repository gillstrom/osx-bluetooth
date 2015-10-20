'use strict';
var test = require('ava');
var osxBluetooth = require('./');

if (!process.env.CI) {
	test('isOn()', function (t) {
		t.plan(1);

		osxBluetooth.isOn().then(function (state) {
			t.assert(typeof state === 'boolean');
		});
	});

	test('off(), on() and toggle()', function (t) {
		t.plan(3);

		osxBluetooth.off().then(function () {
			osxBluetooth.isOn().then(function (state) {
				t.assert(state === false);

				osxBluetooth.on().then(function () {
					osxBluetooth.isOn().then(function (state) {
						t.assert(state === true);

						osxBluetooth.toggle().then(function () {
							osxBluetooth.isOn().then(function (state) {
								t.assert(state === false);
							});
						});
					});
				});
			});
		});
	});
}
