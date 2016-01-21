var Model = require('../src/model.js');
var expect = require('chai').expect;


describe('Model', function() {
  it('should be a function', function() {
    expect(Model).to.be.a.function;
  });

  it('should have sensible defaults', function() {
    var m = Model();

    expect(m.title).to.equal('title');
    expect(m.unit).to.equal('');
    expect(m.radius).to.equal(500);
    expect(m.phoneColor).to.be.a.string;
    expect(m.tabletColor).to.be.a.string;
    expect(m.data).to.be.an.object;
    expect(m.data.phoneAmount).to.be.a.number;
    expect(m.data.tabletAmount).to.be.a.number;
    expect(m.data.timeSeries).to.be.an.array;
  });

  it('should allow us to override the options', function() {
    var opts = {
      title: 'Revenue',
      unit: '$',
      radius: 200,
      phoneColor: 'olive',
      tabletColor: 'sienna'
    };

    var m = Model(opts);
    expect(m.title).to.equal(opts.title);
    expect(m.unit).to.equal(opts.unit);
    expect(m.radius).to.equal(opts.radius);
    expect(m.phoneColor).to.equal(opts.phoneColor);
    expect(m.tabletColor).to.equal(opts.tabletColor);
    expect(m.data).to.be.an.object;
    expect(m.data.phoneAmount).to.be.a.number;
    expect(m.data.tabletAmount).to.be.a.number;
    expect(m.data.timeSeries).to.be.an.array;
  });

});
