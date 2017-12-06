'use strict';

(function () {
  /**
   * Adds an event handler to change the color elements of the wizard.
   * @param {object} item - A reference to the item wizard.
   */
  window.colorize = function (item) {
    item.addEventListener('click', function () {
      if (item.tagName.toLowerCase() === 'div') {
        item.style.backgroundColor = window.util.getRandomElement(window.constants.WIZARD_FIREBALL_COLORS);
      } else if (item.classList.contains('wizard-coat')) {
        item.style.fill = window.util.getRandomElement(window.constants.WIZARD_COAT_COLORS);
      } else {
        item.style.fill = window.util.getRandomElement(window.constants.WIZARD_EYES_COLORS);
      }
    });
  };
})();
