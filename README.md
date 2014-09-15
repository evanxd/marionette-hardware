# marionette-hardware [![Build Status](https://travis-ci.org/evanxd/marionette-hardware.svg)](https://travis-ci.org/evanxd/marionette-hardware)

A node library that provides handler of hardware button through Marionette.

# Usage

### Setup
For Gaia usage, add `marionette.plugin('hardware', require('marionette-hardware'))`
in https://github.com/mozilla-b2g/gaia/blob/master/shared/test/integration/setup.js.

### Click power button
```
client.hardware.clickPower();
```

### Click volume up button
```
client.hardware.clickVolumeUp();
```

### Click volume down button
```
client.hardware.clickVolumeDown();
```

### Click home button
```
client.hardware.clickHome();
```
