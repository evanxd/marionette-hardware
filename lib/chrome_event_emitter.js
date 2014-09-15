function ChromEventEmitter(client) {
  this.client = client;
}

ChromEventEmitter.prototype = {
  emit: function(event) {
    var client = this.client;
    if (client.context !== 'chrome') {
      client.setContext('chrome');
    }
    this._emitChromeEventToSystemApp(event);
    client.setContext('content');
  },

  /**
   * Emit chrome event to systtem app frame,
   * and it only works in chrome context.
   *
   * @param {String} event A chrome event type.
   */
  _emitChromeEventToSystemApp: function(event) {
    this.client.executeScript(function(event) {
      (function() {
        var appDocument = window.wrappedJSObject.document,
            systemApp = appDocument.querySelector('#systemapp'),
            systemAppWindow = systemApp.contentWindow,
            customEvent = systemAppWindow.document.createEvent('CustomEvent'),
            details = Cu.cloneInto({ type: event }, systemAppWindow);

        customEvent.initCustomEvent('mozChromeEvent', true, false, details);
        systemAppWindow.dispatchEvent(customEvent);
      })();
    }, [event]);
  }
};

module.exports = ChromEventEmitter;
