const d3 = require('d3');

const GanttChart = {
  run(stageData) {
    const data = stageData.getGanttDataFormat(1);

    console.log(data);

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#gantt-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(function(stage) { return stage.stage; }));
    y.domain([0, d3.max(data, function(stage) { return stage.end; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.stage); })
        .attr("y", function(d) {
          console.log(d);
          // debugger;
          // return height - (y(d.start) - y(d.end));
          // return height - y(d.end);
          return y(d.end);
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
          return y(d.start) - y(d.end);
          // return height - y(d.end) - y(d.start);
        });
  }
};

module.exports = GanttChart;
