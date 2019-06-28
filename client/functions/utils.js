function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Returns a maximum of two units of time, e.g. '1d 4h ' or '3m 45s ', with
//  seconds being the smallest unit
function formatDuration(milliseconds, units=0) {
  if (units < 2) {
    if (milliseconds > (1000 * 60 * 60 * 24)) {
      let days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
      units++;
      return ((days + 'd ' +
        formatDuration(milliseconds % (1000 * 60 * 60 * 24), units)));
    }
    if (milliseconds > (1000 * 60 * 60)) {
      let days = Math.floor(milliseconds / (1000 * 60 * 60));
      units++;
      return ((days + 'h ' +
        formatDuration(milliseconds % (1000 * 60 * 60), units)));
    }
    if (milliseconds > (1000 * 60)) {
      let days = Math.floor(milliseconds / (1000 * 60));
      units++;
      return ((days + 'm ' +
        formatDuration(milliseconds % (1000 * 60), units)));
    }
    else {
      let days = Math.floor(milliseconds / (1000));
      units++;
      return ((days + 's ' +
        formatDuration(milliseconds % (1000), units)));
    }
    if (units == 0) {
      return '0s';
    }
  }
  return '';
}

function formatMoney(dollars) {
  if (dollars < 100) {
    return ('$' + dollars.toFixed(2));
  }
  return ('$' + Math.round(dollars).toString());
}

module.exports = { shuffle, formatDuration, formatMoney };
