'use strict';

const stackedChart = require('./stacked_chart');
const ganttChart = require('./gantt_chart');
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

    stackedChart.run('#stacked-chart', stageData, 'getStackedDataFormat', dataChart);
    stackedChart.run('#critical-path-chart', stageData, 'getCriticalPathStackedDataFormat', dataChart);
    ganttChart.run(stageData, stageData.getLastId(), dataChart);
  }
};

module.exports = App;
