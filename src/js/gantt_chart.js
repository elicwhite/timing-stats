const d3 = require('d3');

const GanttChart = {
  run(stageData) {
    const data = stageData.getGanttDataFormat(1);

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#gantt-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear().rangeRound([0, width]),
        y = d3.scaleBand().rangeRound([height, 0]).padding(0.1);

    var color = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(stageData.getStages());

    x.domain([0, d3.max(data, function(stage) { return stage.end; })]);
    y.domain(data.map(function(stage) { return stage.stage; }));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(10));

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("y", function(d) { return y(d.stage); })
        .attr("x", function(d) {
          return x(d.start);
        })
        .attr("height", y.bandwidth())
        .attr("width", function(d) {
          return Math.max(3, x(d.end) - x(d.start));
        })
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", function(d) { return color(d.stage); });

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisRight(y));
  }
};

module.exports = GanttChart;
