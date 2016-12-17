'use strict';

const stackedChart = require('./stacked_chart');
const ganttChart = require('./gantt_chart');
const dataFactory = require('./data_factory');

const App = {
  init() {
    const input = document.getElementById('text-input');

    App.getSampleData().then(result => {
      input.value = JSON.stringify(result, null, 2);
    });

    document.getElementById('process-text-input').addEventListener('click', () => {
      const dataString = input.value;
      const data = JSON.parse(dataString);
      const formatted = JSON.stringify(data, null, 2);
      input.value = formatted;

      const stageData = dataFactory.from(data);

      stackedChart.run('#stacked-chart', stageData, 'getStackedDataFormat');
      stackedChart.run('#critical-path-chart', stageData, 'getCriticalPathStackedDataFormat');
      ganttChart.run(stageData, stageData.getLastId());
    });

  },

  getSampleData() {
    return fetch('./sample_data.json')
    .then(response => response.json());
  }
};

module.exports = App;
