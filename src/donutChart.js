var d3 = require('d3');
var uuid = require('uuid');


module.exports = function() {

  var arc = d3.svg.arc();

  var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {
    return d;
  });

  var formatter = d3.format('n');

  var xScale = d3.scale.linear();
  var yScale = d3.scale.linear();

  var area = d3.svg.area();

  function DonutChart(selection) {
    selection.each(function(options) {
      var data = options.data;
      var width = options.width;
      var height = options.height;
      var radius = Math.min(width, height) / 2;

      var step = 10
      var innerRadius = radius - step;

      arc
        .innerRadius(innerRadius)
        .outerRadius(radius);

      xScale
        .domain([0, options.timeSeries.length -1])
        .range([-innerRadius + step, innerRadius - step]);

      yScale
        .domain([0, d3.max(options.timeSeries)])
        .range([innerRadius - step, 2*step]);

      area
        .interpolate('basis')
        .x(function(d, i) { return xScale(i);})
        .y0(innerRadius)
        .y1(function(d, i) { return yScale(d)})

      // SCAFFOLDING
      var svg = d3.select(this).selectAll('svg').data([data]);

      var svgEnter = svg.enter().append('svg')

      var clipId = 'clip-' + uuid.v4();

      svgEnter.append('clipPath')
        .attr("id", clipId)
        .append('circle')

      svg.select('#' + clipId + ' circle')
        .attr('r', innerRadius - step)

      var gEnter = svgEnter
        .append('g')
        .attr('class', 'container')

      gEnter.append('g').attr('class', 'pie');
      gEnter.append('g').attr('class', 'chart');
      gEnter.append('g').attr('class', 'notches');
      var textEnter = gEnter.append('g').attr('class', 'numbers');

      textEnter.append('text').attr('class', 'title')
      textEnter.append('text').attr('class', 'figure')

      svg
        .attr('width', width)
        .attr('height', height);

      var g = svg.select('g.container')
        .attr('transform', function() {
          return 'translate(' + width/2 + ', ' + height/2 + ')';
        });



      // DONUT CHART
      var donut = g.select('g.pie')
        .selectAll('path.donut-arc')
        .data(pie(data))

      donut.enter()
        .append('path')
        .attr('class', 'donut-arc')

      donut
        .attr('d', arc)
        .style('fill', function(d, i) {
          return options.colors[i];
        });

      // AREA CHART
      var timeseries = g.select('g.chart')
        .selectAll('path.timeseries')
        .data([options.timeSeries])

      timeseries.enter()
        .append('path')
        .attr('class', 'timeseries')

      timeseries
        .attr('d', area)
        .attr('clip-path', "url(#" + clipId + ")")
        .style('stroke', options.colors[0])
        .style('fill', options.colors[1])
        .style('fill-opacity', 0.2)
        .style('stroke-opacity', 0.2);


      var title = g.select('text.title')
        .text(options.title)
        .style('font-size', '24px')
        .style('text-anchor', 'middle')
        .style('text-transform', 'uppercase')
        .style('fill', '#AAA')
        .attr('dy', '-1.2em')

      var figure = g.select('text.figure')
        .text(function(d) {
          var sum = formatter(d3.sum(d));
          return sum +  options.unit;
        })
        .style('font-size', '35px')
        .style('text-anchor', 'middle')
        .style('fill', '#333')
        .attr('alignment-baseline', 'middle')

      // NOTCHES
      var notchData = [0, 90, 180, 270];

      var notches = g.select('g.notches')
        .selectAll('line.notch')
        .data(notchData)

      notches.enter()
        .append('line')

      notches
        .attr('x1', innerRadius - step + 2)
        .attr('x2', innerRadius - 2)
        .attr('stroke', '#666')
        .attr('stroke-width', 2)
        .attr('transform', function(d) {
          return 'rotate(' + d + ')';
        });


    });

  }


  return DonutChart;

}
