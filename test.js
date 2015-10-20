import test from 'ava';
import fn from './';

if (!process.env.CI) {
	test('isOn()', async t => {
		t.is(typeof await fn.isOn(), 'boolean');
	});

	test('off(), on() and toggle()', async t => {
		await fn.off();
		t.false(await fn.isOn());
		await fn.on();
		t.true(await fn.isOn());
		await fn.toggle();
		t.false(await fn.isOn());
	});
}
