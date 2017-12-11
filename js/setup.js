'use strict';
(function () {
  var setupWindow = document.querySelector('.setup');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardPlace = document.querySelector('.setup-similar-list');

  window.backend.load(wizardsAdd);


  /*  /!**
     * Gets an array consisting the characteristics of the wizards.
     * @param {array} names - An array with the names of the wizards.
     * @param {array} surnames - An array with the names of the wizards.
     * @param {array} coatColors - An array with the colors of the coat of the wizards.
     * @param {array} eyesColors - An array with the colors of the eyes of the wizards.
     * @param {number} number - The number of wizards required in the array.
     * @return {array} wizards - Returns an array with the characteristics of the wizards.
     *!/
    function generateWizards(names, surnames, coatColors, eyesColors, number) {
      var wizards = new Array(number);
      for (var i = 0; i < number; i++) {
        wizards[i] = {
          name: window.util.getRandomElement(names),
          surname: window.util.getRandomElement(surnames),
          coatColor: window.util.getRandomElement(coatColors),
          eyesColor: window.util.getRandomElement(eyesColors)
        };
      }
      return wizards;
    }*/

  /**
   *Render wizard.
   * @param {object} template - The template wizard.
   * @param {object} wizard - The object with the characteristics of the wizard.
   * @return {object} wizardVisual - Returns the render wizard.
   */
  function wizardRender(template, wizard) {
    var wizardVisual = template.cloneNode(true);
    wizardVisual.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardVisual.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardVisual.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
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
  function wizardsAdd(wizards) {
    var temp = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      temp.append(wizardRender(wizardTemplate, window.util.getRandomElement(wizards)));
    }
    wizardPlace.appendChild(temp);
    setupWindow.querySelector('.setup-similar').classList.remove('hidden');
  }
})();
