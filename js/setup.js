'use strict';

var setupWindow = document.querySelector('.setup');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardPlace = document.querySelector('.setup-similar-list');
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

setupWindow.classList.remove('hidden');

wizardsAdd(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS, NUMBER_OF_WIZARDS, wizardTemplate, wizardPlace);

setupWindow.querySelector('.setup-similar').classList.remove('hidden');

function getRandomElement(array) {
  return array[Math.floor(Math.random() * (array.length - 1))];
}

function generateWizards(names, surnames, coatColors, eyesColors, number) {
  var wizards = new Array(number);
  for (var i = 0; i < number; i++) {
    wizards[i] = {names: getRandomElement(names), surname: getRandomElement(surnames), coatColors: getRandomElement(coatColors), eyesColors: getRandomElement(eyesColors)};
  }
  return wizards;
}

function wizardRender(template, wizard) {
  var wizardVisual = template.cloneNode(true);
  wizardVisual.querySelector('.setup-similar-label').textContent = getRandomElement(wizard.name) + ' ' + getRandomElement(wizard.surname);
  wizardVisual.querySelector('#wizard-coat').style.fill = getRandomElement(wizard.coatColors);
  wizardVisual.querySelector('#wizard-eyes').style.fill = getRandomElement(wizard.eyesColors);
  return wizardVisual;
}

function wizardsAdd(names, surnames, coatColors, eyesColors, number, template, place) {
  var wizards = generateWizards(names, surnames, coatColors, eyesColors, number);
  var temp = document.createDocumentFragment();
  for (var i = 0; i < number; i++) {
    temp.append(wizardRender(template, wizards[i]));
  }
  place.appendChild(temp);
}
