const d3 = require('d3');

const CriticalPathChart = {
  run(stageData) {
    const data = stageData.getStackedDataFormat();

    console.log('foo', data);

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#critical-path-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    window.d3 = d3;

    var x = d3.scaleLinear()
      .range([0, width-100])
      .domain([0, data.length])

    var y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain(stageData.getTimeRange());

    var color = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(stageData.getStages());

    var stack = d3.stack();

    stack.keys(stageData.getStages());

    var area = d3.area()
        .x(function(stage) {
          return x(stage.id);
        })
        .y0(function(stage) { return y(stage.start); })
        .y1(function(stage) { return y(stage.end); });

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer = g.selectAll(".layer")
    .data(stack(data))
    .enter().append("g")
      .attr("class", "layer");

    layer.append("path")
        .attr("class", "area")
        .style("fill", function(stage) { return color(stage.stage); })
        .attr("d", area);

    layer.append("text")
        .attr("x", width - 6)
        .attr("y", function(stage) { return y( (stage.start + stage.end) / 2) })
        .attr("dy", ".35em")
        .style("font", "10px sans-serif")
        .style("text-anchor", "end")
        .text(function(stage) { return stage.stage; });

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"));

    return;

    var state = svg.selectAll(".state")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(group) {
          return "translate(" + x(d.State) + ",0)";
        });

    return;

    state.selectAll("rect")
        .data(function(d) { return d.ages; })
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.name); })
        .style("opacity", .8);

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

module.exports = CriticalPathChart;
