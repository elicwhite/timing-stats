'use strict';

const StackedChart = require('./stacked_chart');
const GanttChart = require('./gantt_chart');
const dataFactory = require('./data_factory');
const DataChart = require('./data_chart');

const App = {
  init() {
    const input = document.getElementById('text-input');

    App.getSampleData().then(result => {
      input.value = JSON.stringify(result, null, 2);
      App.run(result);
    });

    document.getElementById('process-text-input').addEventListener('click', () => {
      const dataString = input.value;
      const data = JSON.parse(dataString);
      const formatted = JSON.stringify(data, null, 2);
      input.value = formatted;
      App.run(data);
    });
  },

  getSampleData() {
    return fetch('./sample_data.json')
      .then(response => response.json());
  },

  run(data) {
    const stageData = dataFactory.from(data);
    stageData.cleanData();
    const dataChart = new DataChart(stageData);

    const ganttChart = new GanttChart(
      stageData,
      dataChart,
      document.getElementsByClassName('gantt-chart-graph')[0]
    );

    const stackedChart = new StackedChart(
      stageData,
      'getStackedDataFormat',
      dataChart,
      document.getElementsByClassName('stacked-chart-graph')[0],
      ganttChart.run
    );

    const criticalStackedChart = new StackedChart(
      stageData,
      'getCriticalPathStackedDataFormat',
      dataChart,
      document.getElementsByClassName('critical-path-graph')[0],
      ganttChart.run
    );

    stackedChart.run();
    criticalStackedChart.run();
    ganttChart.setup();

    ganttChart.run(stageData.getLastId());
  }
};

module.exports = App;