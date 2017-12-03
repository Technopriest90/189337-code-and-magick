'use strict';

(function () {

  var setupWindow = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = setupWindow.querySelector('.setup-user-name');
  var colorWizardCoat = setupWindow.querySelector('.wizard-coat');
  var colorWizardEyes = setupWindow.querySelector('.wizard-eyes');
  var colorWizardFireball = setupWindow.querySelector('.setup-fireball-wrap');

  setupOpen.addEventListener('click', openPopupClickHandler);
  setupOpenIcon.addEventListener('focus', iconFocusHandler);
  setupClose.addEventListener('click', closePopupClickHandler);
  setupClose.addEventListener('focus', closeFocusHandler);
  setupUserName.addEventListener('focus', inputFocusHandler);
  setupUserName.addEventListener('blur', inputFocusHandler);
  window.colorize(colorWizardCoat);
  window.colorize(colorWizardEyes);
  window.colorize(colorWizardFireball);

  /**
   * The event handler on closing pop-up with the Esc button.
   * @param {object} evt - event
   */
  function popupKeydownEscHandler(evt) {
    window.util.isEscEvent(evt, closePopupClickHandler);
  }

  /**
   * The event handler on opening pop-up with the Enter button.
   * @param {object} evt - event
   */
  function popupKeydownEnterHandler(evt) {
    window.util.isEnterEvent(evt, openPopupClickHandler);
  }

  /**
   * The event handler on closing pop-up with the Enter button.
   * @param {object} evt - event
   */
  function popupKeydownEnterCloseHandler(evt) {
    window.util.isEnterEvent(evt, closePopupClickHandler);
  }

  /**
   * Event handler for opening a popup.
   */
  function openPopupClickHandler() {
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
  function closePopupClickHandler() {
    setupWindow.classList.add('hidden');
  }
})();
