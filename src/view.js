var ejs = require('ejs');
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/../_templates/counterTemplate.ejs', 'utf8');
var Model = require('./model');


var View = function ViewConstructor(el, attrs) {
  this.model = Model(attrs);
  this.el = document.querySelector(el);
};

View.prototype.render = function(data) {
  this.model.calculatePercentages();
  var props = this.model.toJSON();
  this.el.innerHTML = ejs.render(template, props);
};

module.exports = View;
