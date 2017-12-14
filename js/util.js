'use strict';

(function () {
  window.util = {
    /**
     * The event handler examines the key pressed is esc.
     * @param {object} evt - event
     * @param {function} action - A function to be run if a key is pressed.
     */
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        action();
      }
    },
    /**
     * The event handler examines the key pressed is enter.
     * @param {object} evt - event
     * @param {function} action - A function to be run if a key is pressed.
     */
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        action();
      }
    },
    /**
     * Gets a random element from an array
     * @param {array} array - Group of elements to produce a random item.
     * @return {string} - Returns a random element of the array.
     */
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * (array.length - 1))];
    },
    /**
     * Removes all children of parent in DOM.
     * @param {object} place - Parent in DOM.
     */
    clearChildren: function (place) {
      while (place.children.length !== 0) {
        place.children[0].remove();
      }
    },

    lastTimeout: null,

    /**
     * Eliminates extra clicks for elements of the wizard.
     * @param {function} action - Event on change of element wizard.
     */
    debounce: function (action) {
      if (window.util.lastTimeout) {
        window.clearTimeout(window.util.lastTimeout);
      }
      window.util.lastTimeout = window.setTimeout(action, window.constants.DEBOUNCE_INTERVAL);
    }
  };
})();
