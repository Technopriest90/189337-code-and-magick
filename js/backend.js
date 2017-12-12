'use strict';

(function () {
  window.backend = {
    /**
     * Loads the data of the wizards from the server.
     * @param {function} onLoad - The function of data processing.
     * @param {function} onError - The error handling function.
     */
    load: function (onLoad, onError) {
      var URL = 'https://1510.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.response !== null) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка соединения');
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Извините, волшебники не успели подгрузиться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 1000;

      xhr.open('GET', URL);
      xhr.send();
    },
    /**
     * Saves the data of the wizards on the server.
     * @param {object} data - Information about wizards to send.
     * @param {function} onLoad - The function of data processing.
     * @param {function} onError - The error handling function.
     */
    save: function (data, onLoad, onError) {
      var URL = 'https://1510.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.response !== null) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка соединения');
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 1000;
      xhr.open('POST', URL);
      xhr.send(data);
    },

    errorHandler: function (errorMessage) {
      var errorWindow = document.querySelector('.setup-similar');
      errorWindow.classList.remove('hidden');
      var error = errorWindow.querySelector('.setup-similar-title');
      error.style.color = 'red';
      error.style.textAlign = 'center';
      error.textContent = errorMessage;
    }
  };

// JSONP test

  /* window.jsonp = {
    DATA_URL: '//js.dump.academy/code-and-magick/data',
    loader: function () {
      var loader = document.createElement('script');
      loader.src = this.DATA_URL + '?callback=__jsonpCallback';

      loader.addEventListener('error', function () {
        document.body.textContent = 'Произошла ошибка при загрузке данных';
      });
      document.body.append(loader);
    }
  };

  window['__jsonpCallback'] = function (data) {
    window.wizardsAdd(data);
  };*/

})();
