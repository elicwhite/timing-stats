const d3 = require('d3');

const StackedChart = {
  run(selector, stageData, methodName, dataChart) {
    const data = stageData[methodName]();

    const stages = stageData.getStages();

    const timeRange = stageData.getStackedTimeRange();

    var margin = {top: 20, right: 20, bottom: 50, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scalePoint()
      .range([0, width-100])
      .domain(data.map(d => d.id));

    var y = d3.scaleTime()
      .rangeRound([height, 0])
      .domain(timeRange);

    var color = dataChart.getStageColorScale();

    var stack = d3.stack();
    stack.keys(stages);

    var area = d3.area()
      .x(function(stage) { return x(stage.data.id); })
      .y0(function(stage) { return y(stage[0]); })
      .y1(function(stage) { return y(stage[1]); });

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer = g.selectAll(".layer")
      .data(stack(data))
      .enter().append("g")
        .attr("class", "layer");

    layer.append("path")
      .attr("class", "area")
      .style("fill", function(d) {
        return color(d.key);
      })
      .attr("d", area);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(
          d3.axisLeft(y)
          .ticks(10)
          .tickFormat(d3.timeFormat("%M:%S"))
        );

    var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });
  }
};

module.exports = StackedChart;
