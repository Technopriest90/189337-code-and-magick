'use strict';

(function () {
  var fileChooser = document.querySelector('.setup-user-pic + input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  fileChooser.addEventListener('change', fileChangeHandler);
  /**
   *Event handler for adding new avatars.
   */
  function fileChangeHandler() {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (matches(fileName)) {
      var fileStream = new FileReader();

      fileStream.addEventListener('load', function () {
        preview.src = fileStream.result;
      });

      fileStream.readAsDataURL(file);
    }
  }

  /**
   *Checks the format of the file.
   *@param {string} fileName - File name.
   *@return {bool} - If the file format can be used return true.
   */
  function matches(fileName) {
    return window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  }
})();
