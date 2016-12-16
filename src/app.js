'use strict';

const stackedChart = require('./stacked_chart');
const ganttChart = require('./gantt_chart');
const dataFactory = require('./data_factory');

const App = {
  init() {
    const input = document.getElementById('text-input');
    if (localStorage.inputJson) {
      input.value = localStorage.inputJson;
    }

    document.getElementById('process-text-input').addEventListener('click', () => {
      const dataString = input.value;
      const data = JSON.parse(dataString);
      const formatted = JSON.stringify(data, null, 2);
      input.value = formatted;
      localStorage.inputJson = formatted;

      const stageData = dataFactory.from(data);

      stackedChart.run('#stacked-chart', stageData, 'getStackedDataFormat');
      stackedChart.run('#critical-path-chart', stageData, 'getCriticalPathStackedDataFormat');
      ganttChart.run(stageData);
    });

  }
};

module.exports = App;
