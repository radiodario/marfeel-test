var assign = require('object-assign')

module.exports = function Model(options) {

  var m = {
    title: 'title',
    unit: '',
    radius: 500,
    phoneColor: 'rgb(0, 200, 0)',
    tabletColor: 'rgb(0, 250, 0)',
    data: {
      phoneAmount: 80000,
      tabletAmount: 120000,
      timeSeries: makeRandomAmounts()
    }
  };

  return assign(m, options);
}


function makeRandomAmounts() {
  var amounts = [];
  for (var i = 0; i < 100; i++) {
    amounts.push((Math.random() * 1000) | 0);
  }
  return amounts;
}
