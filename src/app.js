'use strict';

const fixtureData = require('./fixture_data');
const stackedChart = require('./stacked_chart');
const ganttChart = require('./gantt_chart');
const dataFactory = require('./data_factory');

const App = {
  init() {
    document.getElementById('process-text-input').addEventListener('click', () => {
      console.log('got', document.getElementById('text-input').value);
    });

    const stageData = dataFactory.from(fixtureData);

    stackedChart.run(stageData);
    ganttChart.run(stageData);
  }
};

module.exports = App;
