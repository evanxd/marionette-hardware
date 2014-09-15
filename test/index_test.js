var assert = require('assert'),
    client = null;

suite('MarionetteHardware', function() {
  client = marionette.client();
  marionette.plugin('hardware', require('../index'));

  setup(function() {
    // Add a mozChromeEvent listener to receive chrome events,
    // and add the events into the dataset of body element.
    // Then we could check the events after we click hardware button in tests.
    client.executeScript(function() {
      var appWindow = window.wrappedJSObject;
      appWindow.addEventListener('mozChromeEvent', function(e) {
        var body = appWindow.document.querySelector('body'),
            chromeEvent = body.dataset.chromeEvent;
        if (chromeEvent) {
          chromeEvent = JSON.parse(chromeEvent);
          chromeEvent.push(e.detail.type);
        } else {
          chromeEvent = [e.detail.type];
        }
        body.dataset.chromeEvent = JSON.stringify(chromeEvent);
      });
    });
  });

  test('#clickPower', function() {
    client.hardware.clickPower();
    assertChromeEventContains([
      'sleep-button-press',
      'sleep-button-release'
    ]);
  });

  test('#clickVolumeUp', function() {
    client.hardware.clickVolumeUp();
    assertChromeEventContains([
      'volume-up-button-press',
      'volume-up-button-release'
    ]);
  });

  test('#clickVolumeDown', function() {
    client.hardware.clickVolumeDown();
    assertChromeEventContains([
      'volume-down-button-press',
      'volume-down-button-release'
    ]);
  });

  test('#clickHome', function() {
    client.hardware.clickHome();
    assertChromeEventContains([
      'home-button-press',
      'home-button-release'
    ]);
  });

  function assertChromeEventContains(events) {
    var dataChromeEvent =
      client.findElement('body').getAttribute('data-chrome-event');
    events.forEach(function(event) {
      assert.ok(dataChromeEvent.indexOf(event) !== -1);
    });
  }
});
