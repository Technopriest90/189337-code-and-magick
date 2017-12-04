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

  var setupUserPic = setupWindow.querySelector('.upload');
  var setupUserInput = setupWindow.querySelector('.setup-user-pic + input');

  setupUserPic.addEventListener('mousedown', popupMousedownHandler, true);
  setupUserInput.addEventListener('click', inputClickHandler);

  function inputClickHandler(evt) {
    evt.preventDefault();
  }

  function popupMousedownHandler(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    document.addEventListener('mousemove', popupMousemoveHandler);
    document.addEventListener('mouseup', popupMouseupHandler);


    function popupMousemoveHandler(moveEvt) {
      moveEvt.preventDefault();

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

    function popupMouseupHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', popupMousemoveHandler);
      document.removeEventListener('mouseup', popupMouseupHandler);
    }
  }

  var setupArtifactsShop = setupWindow.querySelector('.setup-artifacts-shop');
  var draggedUnit = null;

  setupArtifactsShop.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedUnit = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var setupArtifacts = setupWindow.querySelector('.setup-artifacts');
  var setupArtifactsCell = setupArtifacts.querySelectorAll('.setup-artifacts-cell');

  for (var i = 0; i < setupArtifactsCell.length; i++) {
    setupArtifactsCell[i].addEventListener('dragover', cellDragoverHandler, false);
  }

  function cellDragoverHandler(evt) {
    evt.preventDefault();
  }

  setupArtifacts.addEventListener('drop', function (evt) {
    evt.target.appendChild(draggedUnit.cloneNode(true));
    evt.target.style.outline = 'none';
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
  setupArtifacts.addEventListener('dragenter', function (evt) {
    evt.target.style.outline = '2px dashed red';
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  setupArtifacts.addEventListener('dragleave', function (evt) {
    evt.target.style.outline = 'none';
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
