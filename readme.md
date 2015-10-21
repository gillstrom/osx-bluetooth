# osx-bluetooth [![Build Status](https://travis-ci.org/gillstrom/osx-bluetooth.svg?branch=master)](https://travis-ci.org/gillstrom/osx-bluetooth)

> Get or set Bluetooth state on OS X systems


## Install

```
$ npm install --save osx-bluetooth
```


## Usage

```js
const osxBluetooth = require('osx-bluetooth');

osxBluetooth.isOn().then(state => {
	console.log(state);
	//=> false
});

osxBluetooth.on().then(() => {
	console.log('Bluetooth state changed to on');
});

osxBluetooth.off().then(() => {
	console.log('Bluetooth state changed to off');
});

osxBluetooth.toggle().then(() => {
	console.log('Bluetooth state changed to on');
});
```


## API

### .isOn()

Check if bluetooth is on or off. Returns a promise for a `boolean`.

### .on()

Turn bluetooth on. Returns a promise.

### .off()

Turn bluetooth off. Returns a promise.

### .toggle([force])

Toggle the bluetooth state. Returns a promise.

#### force

Type: `boolean`

Force a state when toggling.


## CLI

See the [bluetooth](https://github.com/gillstrom/bluetooth) CLI.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
