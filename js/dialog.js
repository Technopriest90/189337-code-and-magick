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
  var setupUserInput = setupWindow.querySelector('.setup-user-pic + input');
  var setupArtifactsShop = setupWindow.querySelector('.setup-artifacts-shop');
  var draggedUnit = null;
  var setupArtifacts = setupWindow.querySelector('.setup-artifacts');
  var setupArtifactsCell = setupArtifacts.querySelectorAll('.setup-artifacts-cell');
  var form = document.querySelector('.setup-wizard-form');

  setupOpen.addEventListener('click', openPopupClickHandler);
  setupOpenIcon.addEventListener('focus', iconFocusHandler);
  setupClose.addEventListener('click', closePopupClickHandler);
  setupClose.addEventListener('focus', closeFocusHandler);
  setupUserName.addEventListener('focus', inputFocusHandler);
  setupUserName.addEventListener('blur', inputFocusHandler);
  window.color.colorizeElement(colorWizardCoat, window.constants.WIZARD_COAT_COLORS, window.color.fillElement);
  window.color.colorizeElement(colorWizardEyes, window.constants.WIZARD_EYES_COLORS, window.color.fillElement);
  window.color.colorizeElement(colorWizardFireball, window.constants.WIZARD_FIREBALL_COLORS, window.color.changeElementBackground);
  setupUserInput.addEventListener('dragstart', popupDragstartHandler);
  setupArtifactsShop.addEventListener('dragstart', shopDragStartHandler);
  addDragoverToCell(setupArtifactsCell);
  setupArtifacts.addEventListener('drop', artifactsDropHandler);
  setupArtifacts.addEventListener('dragenter', artifactsDragCenterHandler);
  setupArtifacts.addEventListener('dragleave', artifactsDragLeaveHandler);
  form.addEventListener('submit', formSubmitHandler);

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
    window.backend.load(window.backend.loadHandler, window.backend.errorHandler);
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
  /**
   * Event handler for moving the settings window.
   * @param {object} evt - event
   */
  function popupDragstartHandler(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    document.addEventListener('mousemove', popupMousemoveHandler);
    document.addEventListener('mouseup', popupMouseupHandler);
    /**
     * Part of the event handler is responsible for moving.
     * @param {object} moveEvt - event
     */
    function popupMousemoveHandler(moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupWindow.style.top = (setupWindow.offsetTop - shift.y) + 'px';
      setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + 'px';
    }

    /**
     * Part of the event handler is responsible for stopping the movement.
     */
    function popupMouseupHandler() {
      document.removeEventListener('mousemove', popupMousemoveHandler);
    }
  }

  /**
   * The event handler is responsible for starting the movement of artifact.
   * @param {object} evt - event
   */
  function shopDragStartHandler(evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedUnit = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  }

  /**
   * Adds an event handler dragover to the  inventory slots.
   * @param {object} cell - the inventory slots.
   */
  function addDragoverToCell(cell) {
    for (var i = 0; i < cell.length; i++) {
      cell[i].addEventListener('dragover', cellDragoverHandler, false);
    }
  }

  /**
   * Adds drop artifact in the cell inventory
   * @param {object} evt - event
   */
  function artifactsDropHandler(evt) {
    evt.target.appendChild(draggedUnit.cloneNode(true));
    evt.target.removeEventListener('dragover', cellDragoverHandler);
    evt.target.style.outline = 'none';
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  }

  /**
   * Adds a backlight to the inventory slot when you transfer artifact.
   * @param {object} evt - event
   */
  function artifactsDragCenterHandler(evt) {
    evt.target.style.outline = '2px dashed red';
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  }

  /**
   * Adds a backlight to the inventory slot when you transfer artifact.
   * @param {object} evt - event
   */
  function artifactsDragLeaveHandler(evt) {
    evt.target.style.outline = 'none';
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  }

  /**
   * The event handler prohibiting movement into the cell.
   * @param {object} evt - event
   */
  function cellDragoverHandler(evt) {
    evt.preventDefault();
  }

  function formSubmitHandler(evt) {
    window.backend.save(new FormData(form), function () {
      setupWindow.classList.add('hidden');
    }, window.backend.errorHandler);
    evt.preventDefault();
  }
})();
