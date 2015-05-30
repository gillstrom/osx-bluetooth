# osx-bluetooth [![Build Status](https://travis-ci.org/gillstrom/osx-bluetooth.svg?branch=master)](https://travis-ci.org/gillstrom/osx-bluetooth)

> Get or set Bluetooth state on OS X systems


## Install

```
$ npm install --save osx-bluetooth
```


## Usage

```js
var osxBluetooth = require('osx-bluetooth');

osxBluetooth.get(function (err, state) {
	console.log(state);
	//=> 0
});

osxBluetooth.set(1, function (err) {
	console.log('Bluetooth state changed to on');
});
```


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
