'use strict';

(function () {
  window.wizard = {
    data: null,
    colorCoat: null,
    colorEyes: null,

    updateWIzards: function () {
      window.wizardsAdd(window.wizard.data.sort(function (left, right) {
        var rankDiff = window.wizard.getWeight(right) - window.wizard.getWeight(left);
        if (rankDiff === 0) {
          rankDiff = window.wizard.namesComparator(left.name, right.name);
        }
        return rankDiff;
      }));
    },
    getWeight: function (wizard) {
      var weight = 0;

      if (wizard.colorCoat === this.colorCoat) {
        weight += 2;
      }
      if (wizard.colorEyes === this.colorEyes) {
        weight += 1;
      }

      return weight;
    },
    namesComparator: function (left, right) {
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        return 0;
      }
    }
  };
})();
