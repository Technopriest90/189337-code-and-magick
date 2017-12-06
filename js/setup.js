'use strict';
(function () {
  var setupWindow = document.querySelector('.setup');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardPlace = document.querySelector('.setup-similar-list');

  wizardsAdd(window.constants.WIZARD_NAMES, window.constants.WIZARD_SURNAMES, window.constants.WIZARD_COAT_COLORS, window.constants.WIZARD_EYES_COLORS, window.constants.NUMBER_OF_WIZARDS, wizardTemplate, wizardPlace);

  setupWindow.querySelector('.setup-similar').classList.remove('hidden');

  /**
   * Gets a random element from an array
   * @param {array} array - Group of elements to produce a random item.
   * @return {string} - Returns a random element of the array.
   */
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * (array.length - 1))];
  }

  /**
   * Gets an array consisting the characteristics of the wizards.
   * @param {array} names - An array with the names of the wizards.
   * @param {array} surnames - An array with the names of the wizards.
   * @param {array} coatColors - An array with the colors of the coat of the wizards.
   * @param {array} eyesColors - An array with the colors of the eyes of the wizards.
   * @param {number} number - The number of wizards required in the array.
   * @return {array} wizards - Returns an array with the characteristics of the wizards.
   */
  function generateWizards(names, surnames, coatColors, eyesColors, number) {
    var wizards = new Array(number);
    for (var i = 0; i < number; i++) {
      wizards[i] = {
        name: getRandomElement(names),
        surname: getRandomElement(surnames),
        coatColor: getRandomElement(coatColors),
        eyesColor: getRandomElement(eyesColors)
      };
    }
    return wizards;
  }

  /**
   *Render wizard.
   * @param {object} template - The template wizard.
   * @param {object} wizard - The object with the characteristics of the wizard.
   * @return {object} wizardVisual - Returns the render wizard.
   */
  function wizardRender(template, wizard) {
    var wizardVisual = template.cloneNode(true);
    wizardVisual.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    wizardVisual.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardVisual.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardVisual;
  }

  /**
   * Adds a card with a render wizard on the page
   * @param {array} names - An array with the names of the wizards.
   * @param {array} surnames - An array with the names of the wizards.
   * @param {array} coatColors - An array with the colors of the coat of the wizards.
   * @param {array} eyesColors - An array with the colors of the eyes of the wizards.
   * @param {number} number - The number of wizards required in the array.
   * @param {array} template - The template wizard.
   * @param {array} place - Place to add a wizard.
   */
  function wizardsAdd(names, surnames, coatColors, eyesColors, number, template, place) {
    var wizards = generateWizards(names, surnames, coatColors, eyesColors, number);
    var temp = document.createDocumentFragment();
    for (var i = 0; i < number; i++) {
      temp.append(wizardRender(template, wizards[i]));
    }
    place.appendChild(temp);
  }
})();
