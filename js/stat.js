'use strict';

window.renderStatistics = function (ctx, names, times) {
  var axisXTable = 100;
  var axisYTable = 10;
  var widthTable = 420;
  var heightTable = 250;
  var stepImage = 10;
  var colorTable = 'rgba(256, 256, 256, 1.0)';

  var lengthShadow = 10;
  var colorShadow = 'rgba(0, 0, 0, 0.7)';

  var text = ['Ура вы победили!', 'Список результатов:'];


  drawRectangle(axisXTable + lengthShadow, axisYTable + lengthShadow, widthTable, heightTable, stepImage, colorShadow);
  drawRectangle(axisXTable, axisYTable, widthTable, heightTable, stepImage, colorTable);
  drawText(text);
  drawHistogram();

  function drawHistogram() {
    var max = -1;
    var maxIndex = -1;
    var histogramHeight = 150;              // px;
    var barWidth = 40; // px;
    var margin = 40;
    var indent = (((widthTable + 20) - times.length * barWidth - margin * 2) / (times.length - 1)) + barWidth;    // px;
    var initialX = axisXTable + margin; // px;
    var initialY = axisYTable + heightTable - histogramHeight - 20;  // px;

    for (var i = 0; i < times.length; i++) {
      var time = times[i];
      if (time > max) {
        max = time;
        maxIndex = i;
      }
    }

    var step = histogramHeight / max; // px;

    for (var i = 0; i < times.length; i++) {
      // if (names[i] === 'Вы') {
      //   ctx.fillStyle('rgba(255, 0, 0, 1)');
      // } else {
      //   ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random().toFixed(1) + ')';
      // }
      ctx.fillRect(initialX + indent * i, initialY + (histogramHeight - times[i] * step), barWidth, times[i] * step);
      ctx.fillStyle('rgba(0, 0, 0, 1)');
      ctx.fillText(names[i], initialX + indent * i, initialY + (histogramHeight - times[i] * step) + times[i] * step + 20);
      ctx.fillText(Math.floor(times[i]), initialX + indent * i, initialY + (histogramHeight - times[i] * step) - 10);
    //  ctx.fillText('Худшее время: ' + max.toFixed(2) + 'мс у игрока ' + names[maxIndex], 120, 60);
    }
  }

  function drawRectangle(axisX, axisY, width, height, stepImg, color) {
    var tempX = axisX;
    var tempY = axisY;
    ctx.fillStyle = color; // white;
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

  function drawText (words) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    for (var j = 0; j < words.length; j++) {
      ctx.fillText(words[j], axisXTable + (widthTable / 2) - (words[j].length * 4), (j + 1) * 30);
    }
  }
};
