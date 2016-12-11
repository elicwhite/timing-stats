'use strict';

const fixtureData = require('./fixture_data');
const criticalPathChart = require('./critical_path_chart');
const dataFactory = require('./data_factory');

const App = {
  init() {
    document.getElementById('process-text-input').addEventListener('click', () => {
      console.log('got', document.getElementById('text-input').value);
    });

    const stageData = dataFactory.from(fixtureData);

    criticalPathChart.run(stageData);
  }
};

module.exports = App;
