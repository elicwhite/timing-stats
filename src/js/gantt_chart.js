'use strict';

const d3 = require('d3');

const GanttChart = {
  run(stageData, id, dataChart) {
    const data = stageData.getGanttDataFormat(id);

    const margin = {
      top: 20, right: 20, bottom: 30, left: 40
    };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select('#gantt-chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scaleTime().rangeRound([0, width]);
    const y = d3.scaleBand().rangeRound([height, 0]).padding(0.1);

    const color = dataChart.getStageColorScale();

    x.domain([0, d3.max(data, (stage) => {
      return stage.end;
    })]);
    y.domain(data.map((stage) => {
      return stage.stage;
    }));

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('y', (d) => {
        return y(d.stage);
      })
      .attr('x', (d) => {
        return x(d.start);
      })
      .attr('height', y.bandwidth())
      .attr('width', (d) => {
        return Math.max(3, x(d.end) - x(d.start));
      })
      .attr('rx', 5)
      .attr('ry', 5)
      .style('fill', (d) => {
        return color(d.stage);
      });

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
          d3.axisBottom(x)
            .ticks(10)
            .tickFormat(d3.timeFormat('%M:%S'))
        );

    svg.append('text')
      .attr('y', height + margin.top + 30)
      .attr('x', (width / 2))
      .style('text-anchor', 'middle')
      .text('Minute:Second');

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisRight(y));
  }
};

module.exports = GanttChart;
