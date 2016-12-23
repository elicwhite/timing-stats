'use strict';

const d3 = require('d3');

class StackedChart {
  constructor(stageData, methodName, dataChart, svg, callback) {
    this.stageData = stageData;
    this.methodName = methodName;
    this.dataChart = dataChart;
    this.svg = d3.select(svg);
    this.callback = callback;
  }

  run() {
    const data = this.stageData[this.methodName]();

    const stages = this.stageData.getStages();

    const timeRange = this.stageData.getStackedTimeRange();

    const margin = {
      top: 20, right: 20, bottom: 50, left: 40
    };

    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = this.svg
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scalePoint()
      .range([0, width - 100])
      .domain(data.map(d => d.id));

    const y = d3.scaleTime()
      .rangeRound([height, 0])
      .domain(timeRange);

    const color = this.dataChart.getStageColorScale();

    const stack = d3.stack();
    stack.keys(stages);

    const area = d3.area()
      .x((stage) => {
        return x(stage.data.id);
      })
      .y0((stage) => {
        return y(stage[0]);
      })
      .y1((stage) => {
        return y(stage[1]);
      });

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const layer = g.selectAll('.layer')
      .data(stack(data))
      .enter().append('g')
        .attr('class', 'layer');

    layer.append('path')
      .attr('class', 'area')
      .style('fill', (d) => {
        return color(d.key);
      })
      .attr('d', area);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('text')
      .attr('y', height + margin.top + 30)
      .attr('x', (width / 2))
      .style('text-anchor', 'middle')
      .text('Build ID');

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(
          d3.axisLeft(y)
            .ticks(10)
            .tickFormat(d3.timeFormat('%M:%S'))
        );

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - (margin.left / 2))
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Minute:Second');

    const legend = svg.selectAll('.legend')
      .data(color.domain().slice().reverse())
      .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => {
          return 'translate(0,' + i * 20 + ')';
        });

    legend.append('rect')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color);

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text((d) => {
        return d;
      });

    g.append('rect')
      .attr('class', 'chart-overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mousemove', mouseMove);

    const callback = this.callback;

    function mouseMove() {
      const xPos = d3.mouse(this)[0];
      const left = x.range()[0];
      const width = x.step();

      const offset = x.domain().map((array, index) => {
        return left + (width * index) - width / 2;
      });

      const index = d3.bisect(offset, xPos);
      const buildId = x.domain()[index - 1];
      callback(buildId);
    }
  }
}

module.exports = StackedChart;
