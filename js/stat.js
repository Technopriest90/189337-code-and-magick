'use strict';

window.renderStatistics = function (ctx, names, times) {
  var axisXTable = 100;
  var axisYTable = 10;
  var widthTable = 420;
  var heightTable = 250;
  var stepImage = 10;
  var colorTable1 = 'orange';
  var colorTable2 = 'white';

  var lengthShadow = 10;
  var colorShadow = 'rgba(0, 0, 0, 0.7)';

  var text = ['Ура вы победили!', 'Список результатов:'];

  var histogramHeight = 150;
  var barWidth = 40;
  var margin = 40;

  drawRectangle(axisXTable + lengthShadow, axisYTable + lengthShadow, widthTable, heightTable, stepImage, colorShadow, colorShadow);
  drawRectangle(axisXTable, axisYTable, widthTable, heightTable, stepImage, colorTable1, colorTable2);
  drawText(text);
  drawHistogram(histogramHeight, barWidth, margin);
  /**
   * Draws a histogram.
   * @param {string} height - Height of the Histogram.
   * @param {string} width - Width of the Histogram.
   * @param {string} paddingLR - The padding on the left and right on the sheet for the histogram
   */
  function drawHistogram(height, width, paddingLR) {
    var indent = (((widthTable + 20) - times.length * width - paddingLR * 2) / (times.length - 1)) + width;
    var initialX = axisXTable + paddingLR; // px;
    var initialY = axisYTable + heightTable - height - 20;
    var max = getMaxTimes(times);
    var step = height / max; // px;

    for (var i = 0; i < times.length; i++) {
      drawColumn(initialX + indent * i, initialY + (height - times[i] * step), width, times[i] * step, names[i], times[i]);
    }
  }
  /**
   * Get the maximum value from the array.
   * @param {array} playTimes - Game time of the players.
   * @return {string} max - Maximum playing time
   */
  function getMaxTimes(playTimes) {
    var max = 0;
    for (var i = 0; i < playTimes.length; i++) {
      var time = playTimes[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  }
  /**
   * Draws a histogram bar.
   * @param {number} X - The beginning of the column along the X-axis.
   * @param {number} Y - The beginning of the column along the Y-axis.
   * @param {number} width - The width of the column.
   * @param {number} height - The height of the column.
   * @param {string} playerName - Player name.
   * @param {number} playerTime - Playing time.
   */
  function drawColumn(X, Y, width, height, playerName, playerTime) {
    ctx.fillStyle = getColorColumn(playerName);
    ctx.fillRect(X, Y, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.textAlign = 'center';
    ctx.fillText(playerName, X + width / 2, Y + height + 20);
    ctx.fillText(Math.floor(playerTime), X + width / 2, Y - 10);
  }
  /**
   * Gets the color of the column by the name of the player.
   * @param {string} playerName - The names of the players.
   * @return {string} playerName - the color of the column
   */
  function getColorColumn(playerName) {
    return playerName === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255,' + Math.random() + ')';
  }
  /**
   * Draws the sheet of the histogram.
   * @param {number} axisX - The beginning of the sheet on the X-axis.
   * @param {number} axisY - The beginning of the sheet on the Y-axis.
   * @param {number} width - The width of the sheet.
   * @param {number} height - The height of the sheet.
   * @param {number} stepImg - Step pattern border.
   * @param {string} color1 - The main color of the gradient background sheet.
   * @param {string} color2 - The additional color of the gradient background sheet.
   */
  function drawRectangle(axisX, axisY, width, height, stepImg, color1, color2) {
    var tempX = axisX;
    var tempY = axisY;
    var gradient = ctx.createRadialGradient(axisXTable + widthTable / 2, axisYTable + heightTable / 2, widthTable / heightTable * 100, axisXTable + widthTable / 2, axisYTable + heightTable / 2, widthTable / heightTable * 30);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(tempX, tempY);
    do {
      ctx.lineTo(tempX += stepImg, tempY - stepImg);
      ctx.lineTo(tempX += stepImg, tempY);
    } while (tempX <= width + axisX);
    do {
      ctx.lineTo(tempX + stepImg, tempY += stepImg);
      ctx.lineTo(tempX, tempY += stepImg);
    } while (tempY <= height + axisY);

    do {
      ctx.lineTo(tempX -= stepImg, tempY + stepImg);
      ctx.lineTo(tempX -= stepImg, tempY);
    } while (tempX !== axisX);

    do {
      ctx.lineTo(tempX - stepImg, tempY -= stepImg);
      ctx.lineTo(tempX, tempY -= stepImg);
    } while (tempY !== axisY);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  /**
   * Places a line through the newline.
   * @param {array} words - An array of individual lines.
   */
  function drawText(words) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textAlign = 'center';
    for (var j = 0; j < words.length; j++) {
      ctx.fillText(words[j], axisXTable + (widthTable / 2), (j + 1) * 25);
    }
  }
};
