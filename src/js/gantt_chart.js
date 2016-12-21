'use strict';

const d3 = require('d3');

const TRANSITION_DURATION = 300;

class GanttChart {
  constructor(stageData, dataChart, svg) {
    this.stageData = stageData;
    this.dataChart = dataChart;
    this.svg = d3.select(svg);

    this.run = this.run.bind(this);
    this.getBarWidth = this.getBarWidth.bind(this);
    this.buildId = undefined;
  }

  setup() {
    const margin = {
      top: 20, right: 20, bottom: 30, left: 40
    };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    this.svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    this.chart = this.svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    this.xScale = d3.scaleTime().rangeRound([0, width]);
    this.yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1);

    this.colorScale = this.dataChart.getStageColorScale();

    this.xAxis = d3.axisBottom(this.xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat('%M:%S'));

    this.yAxis = d3.axisRight(this.yScale);

    this.chart.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')');

    this.chart.append('g')
      .attr('class', 'axis axis--y');

    this.svg.append('text')
      .attr('y', height + margin.top + 30)
      .attr('x', (width / 2))
      .style('text-anchor', 'middle')
      .text('Minute:Second');
  }

  run(id) {
    if (this.buildId === id) {
      return;
    }

    this.buildId = id;

    const data = this.stageData.getGanttDataFormat(id);

    this.xScale.domain([0, d3.max(data, (stage) => {
      return stage.end;
    })]);
    this.yScale.domain(data.map((stage) => {
      return stage.stage;
    }));

    const bars = this.chart.selectAll('.bar')
      .data(data, stage => stage.stage);

    bars.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', (d) => {
        return this.yScale(d.stage);
      })
      .attr('height', this.yScale.bandwidth())
      .attr('rx', 5)
      .attr('ry', 5)
      .style('fill', (d) => {
        return this.colorScale(d.stage);
      })
      .transition()
      .duration(TRANSITION_DURATION)
      .attr('x', (d) => {
        return this.xScale(d.start);
      })
      .attr('width', (d) => this.getBarWidth(d));

    bars.transition()
      .duration(TRANSITION_DURATION)
      .attr('y', (d) => {
        return this.yScale(d.stage);
      })
      .attr('x', (d) => {
        return this.xScale(d.start);
      })
      .attr('height', this.yScale.bandwidth())
      .attr('width', this.getBarWidth);

    bars.exit()
      .transition()
      .duration(TRANSITION_DURATION)
      .attr('x', this.xScale(0))
      .attr('width', 0)
      .style('fill-opacity', 1e-6)
      .remove();

    this.svg.select('.axis--x')
      .transition()
      .duration(TRANSITION_DURATION)
      .call(this.xAxis);

    this.svg.select('.axis--y')
      .transition()
      .duration(TRANSITION_DURATION)
      .call(this.yAxis);
  }

  getBarWidth(datum) {
    return Math.max(3, this.xScale(datum.end) - this.xScale(datum.start));
  }
}

module.exports = GanttChart;
