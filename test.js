'use strict';
var test = require('ava');
var osxBluetooth = require('./');

if (!process.env.CI) {
	test('isOn()', function (t) {
		t.plan(2);

		osxBluetooth.isOn(function (err, state) {
			t.assert(!err, err);
			t.assert(typeof state === 'boolean');
		});
	});

	test('off(), on() and toggle()', function (t) {
		t.plan(9);

		osxBluetooth.off(function (err) {
			t.assert(!err, err);

			osxBluetooth.isOn(function (err, state) {
				t.assert(!err, err);
				t.assert(state === false);

				osxBluetooth.on(function (err) {
					t.assert(!err, err);

					osxBluetooth.isOn(function (err, state) {
						t.assert(!err, err);
						t.assert(state === true);

						osxBluetooth.toggle(function (err) {
							t.assert(!err, err);

							osxBluetooth.isOn(function (err, state) {
								t.assert(!err, err);
								t.assert(state === false);
							});
						});
					});
				});
			});
		});
	});
}
