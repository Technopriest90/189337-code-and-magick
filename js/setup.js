'use strict';

var setupWindow = document.querySelector('.setup');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardPlace = document.querySelector('.setup-similar-list');
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_WIZARDS = 4;

wizardsAdd(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS, NUMBER_OF_WIZARDS, wizardTemplate, wizardPlace);

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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');
var setupUserName = setupWindow.querySelector('.setup-user-name');
var colorWizardCoat = setupWindow.querySelector('.wizard-coat');
var colorWizardEyes = setupWindow.querySelector('.wizard-eyes');
var colorWizardFireball = setupWindow.querySelector('.setup-fireball-wrap');

setupOpen.addEventListener('click', openPopup);
setupOpenIcon.addEventListener('focus', iconFocusHandler);
setupClose.addEventListener('click', closePopup);
setupClose.addEventListener('focus', closeFocusHandler);
setupUserName.addEventListener('focus', inputFocusHandler);
setupUserName.addEventListener('blur', inputFocusHandler);
colorWizardCoat.addEventListener('click', colorClickHandler(colorWizardCoat, WIZARD_COAT_COLORS));
colorWizardEyes.addEventListener('click', colorClickHandler(colorWizardEyes, WIZARD_EYES_COLORS));
colorWizardFireball.addEventListener('click', colorFireballClickHandler(colorWizardFireball, WIZARD_FIREBALL_COLORS));
/**
 * The event handler on closing pop-up with the Esc button.
 * @param {object} evt - event
 */
function popupKeydownEscHandler(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}
/**
 * The event handler on opening pop-up with the Enter button.
 * @param {object} evt - event
 */
function popupKeydownEnterHandler(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
}
/**
 * The event handler on closing pop-up with the Enter button.
 * @param {object} evt - event
 */
function popupKeydownEnterCloseHandler(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
}
/**
 * Event handler for opening a popup.
 */
function openPopup() {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', popupKeydownEscHandler);
}
/**
 * The event handler adding an event handler on the event object. This event handler is required for open a pop-up by pressing enter.
 * @param {object} evt - event
 */
function iconFocusHandler(evt) {
  evt.currentTarget.addEventListener('keydown', popupKeydownEnterHandler);
}
/**
 * The event handler adding an event handler on the event object. This event handler is required for close a pop-up by pressing enter.
 * @param {object} evt - event
 */
function closeFocusHandler(evt) {
  evt.currentTarget.addEventListener('keydown', popupKeydownEnterCloseHandler);
}
/**
 * The event handler adds or removes an event handler on the document depending on the type of event.
 * @param {object} evt - event
 */
function inputFocusHandler(evt) {
  if (evt.type === 'focus') {
    document.removeEventListener('keydown', popupKeydownEscHandler);
  } else if (evt.type === 'blur') {
    document.addEventListener('keydown', popupKeydownEscHandler);
  }
}
/**
 *Event handler for closing a popup.
 */
function closePopup() {
  setupWindow.classList.add('hidden');
}
/**
 * Event handler for choosing the color for elements of a wizard.
 * @param {object} item - A reference to the item wizard.
 * @param {array} colors - The array of colors of elements of the wizard.
 * @return {function} - Returns the function changes the color of the item wizard.
 */
function colorClickHandler(item, colors) {
  return function () {
    item.style.fill = getRandomElement(colors);
  };
}
/**
 * Event handler for choosing the color for fireball of a wizard.
 * @param {object} item - A reference to the fireball wizard.
 * @param {array} colors - The array of colors of fireballs of the wizard.
 * @return {function} - Returns the function changes the color of the fireball wizard.
 */
function colorFireballClickHandler(item, colors) {
  return function () {
    item.style.backgroundColor = getRandomElement(colors);
  };
}


