var assign = require('object-assign')
var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise();
var d3 = require('d3');

module.exports = function Model(options) {
  var defaults = {
    title: 'title',
    unit: '€',
    radius: 500,
    tabletColor: 'rgb(79, 208, 37)',
    phoneColor: 'rgb(15, 89, 0)',
    data: {
      phoneAmount: 80000,
      tabletAmount: 120000
    },
    timeSeries: makeRandomAmounts()
  };

  var model = {
    props : assign(defaults, options),
    toJSON: function() {
      return JSON.parse(JSON.stringify(this.props));
    },
    calculatePercentages: function() {
      var tabletAmt = this.props.data.tabletAmount;
      var phoneAmt = this.props.data.phoneAmount;
      var total = tabletAmt + phoneAmt;
      this.props.data.tabletPct = (tabletAmt / total * 100) | 0;
      this.props.data.phonePct = (phoneAmt / total * 100) | 0;
    },
    formatData: function() {
      var formatter = d3.format('n');
      this.props.tabletAmount = formatter(this.props.data.tabletAmount);
      this.props.phoneAmount = formatter(this.props.data.phoneAmount);
    }
  }

  return model;
}


function makeRandomAmounts() {
  var amounts = [];
  for (var i = 0; i < 24; i++) {
    amounts.push(2.5 + simplex.noise2D(i, i));
  }
  return amounts;
}
