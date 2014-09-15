var ChromEventEmitter = require('./lib/chrome_event_emitter'),
    chromeEventEmitter = null;

function MarionetteHardware(client, options) {
  this.client = client;
  this.options = options;
  chromeEventEmitter = new ChromEventEmitter(this.client);
}

MarionetteHardware.prototype = {
  /**
   * Click power button.
   */
  clickPower: function() {
    chromeEventEmitter.emit('sleep-button-press');
    chromeEventEmitter.emit('sleep-button-release');
  },

  /**
   * Click volume up button.
   */
  clickVolumeUp: function() {
    chromeEventEmitter.emit('volume-up-button-press');
    chromeEventEmitter.emit('volume-up-button-release');
  },

  /**
   * Click volume down button.
   */
  clickVolumeDown: function() {
    chromeEventEmitter.emit('volume-down-button-press');
    chromeEventEmitter.emit('volume-down-button-release');
  },

  /**
   * Click home button.
   */
  clickHome: function() {
    chromeEventEmitter.emit('home-button-press');
    chromeEventEmitter.emit('home-button-release');
  }
};

MarionetteHardware.setup = function(client, options) {
  return new MarionetteHardware(client, options);
};

module.exports = MarionetteHardware;
