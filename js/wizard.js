'use strict';

(function () {
  window.wizard = {
    data: null,
    colorCoat: null,
    colorEyes: null,

    /**
     *Updates the list of wizards.
     */
    updateWizards: function () {
      window.wizardsAdd(window.wizard.data.sort(wizardsSortingCallback));
    }
  };

  /**
   *The sorting logic wizards.
   * @param {object} left - Left element in array of wizards.
   * @param {object} right - Right element in array of wizards.
   * @return {number} rankDiff - Returns 1, -1 or 0 for a function sort.
   */
  function wizardsSortingCallback(left, right) {
    var rankDiff = getWeight(right) - getWeight(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  }

  /**
   *Gets the weight of the wizard depending on the number of matching elements.
   * @param {object} wizard - Data about wizard.
   * @return {number} weight - Returns the weight of a wizard.
   */
  function getWeight(wizard) {
    var weight = 0;

    if (wizard.colorCoat === window.wizard.colorCoat) {
      weight += 2;
    }
    if (wizard.colorEyes === window.wizard.colorEyes) {
      weight += 1;
    }

    return weight;
  }

  /**
   *The sorting logic wizards names.
   * @param {object} left - Left element in array of wizards.
   * @param {object} right - Right element in array of wizards.
   * @return {number} - Returns 1, -1 or 0 for a function sort.
   */
  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }
})();
