var assign = require('object-assign')

module.exports = function Model(options) {
  var defaults = {
    title: 'title',
    unit: '',
    radius: 500,
    phoneColor: 'rgb(0, 200, 0)',
    tabletColor: 'rgb(0, 250, 0)',
    data: {
      phoneAmount: 80000,
      tabletAmount: 120000,
      timeSeries: makeRandomAmounts()
    },
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
    }
  }

  return model;
}


function makeRandomAmounts() {
  var amounts = [];
  for (var i = 0; i < 100; i++) {
    amounts.push((Math.random() * 1000) | 0);
  }
  return amounts;
}
