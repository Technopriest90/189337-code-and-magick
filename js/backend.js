'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://1510.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://1510.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
