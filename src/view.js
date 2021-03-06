var d3 = require('d3');
var ejs = require('ejs');
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/../_templates/template.ejs', 'utf8');
var Model = require('./model');
var DonutChart = require('./donutChart');

var View = function ViewConstructor(el, attrs) {
  this.model = Model(attrs);
  this.el = el;
  this.chart = DonutChart();
};

View.prototype.render = function(data) {
  this.model.calculatePercentages();
  this.model.formatData();
  var props = this.model.toJSON();
  this.el.innerHTML = ejs.render(template, props);

  var dataObject = {
    width: 350,
    height: 250,
    data : [
      props.data.phoneAmount,
      props.data.tabletAmount
    ],
    title: props.title,
    unit: props.unit,
    timeSeries: props.timeSeries,
    colors: [
      props.phoneColor,
      props.tabletColor
    ]
  }

  var container = this.el.querySelector('.graphic');

  d3.select(container)
    .datum(dataObject)
    .call(this.chart);

};

module.exports = View;
