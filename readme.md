# osx-bluetooth [![Build Status](https://travis-ci.org/gillstrom/osx-bluetooth.svg?branch=master)](https://travis-ci.org/gillstrom/osx-bluetooth)

> Get or set Bluetooth state on OS X systems


## Install

```
$ npm install --save osx-bluetooth
```


## Usage

```js
var osxBluetooth = require('osx-bluetooth');

osxBluetooth.isOn(function (err, state) {
	console.log(state);
	//=> false
});

osxBluetooth.on(function (err) {
	console.log('Bluetooth state changed to on');
});

osxBluetooth.off(function (err) {
	console.log('Bluetooth state changed to off');
});

osxBluetooth.toggle(function (err) {
	console.log('Bluetooth state changed to on');
});
```


## CLI

See the [bluetooth](https://github.com/gillstrom/bluetooth) CLI.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
