'use strict';

(function () {
  window.color = {
    /**
     * Adds an event handler to change the color elements of the wizard.
     * @param {object} element - A reference to the item wizard.
     * @param {array} color - The array of colors of the elements.
     * @param {object} action - Action item wizard.
     */
    colorizeElement: function (element, color, action) {
      element.addEventListener('click', action(element, color));
    },
    /**
     * Change the fill property of an element wizard.
     * @param {object} element - A reference to the item wizard.
     * @param {array} color - The array of colors of the elements.
     * @return {function} - Return this function.
     */
    fillElement: function (element, color) {
      return function () {
        element.style.fill = window.util.getRandomElement(color);
      };
    },
    /**
     * Change the background color property of an element wizard.
     * @param {object} element - A reference to the item wizard.
     * @param {array} color - The array of colors of the elements.
     * @return {function} - Return this function.
     */
    changeElementBackground: function (element, color) {
      return function () {
        element.style.backgroundColor = window.util.getRandomElement(color);
      };
    }
  };
})();

