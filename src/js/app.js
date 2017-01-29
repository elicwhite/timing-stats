'use strict';

const queryString = require('querystring');
const StackedChart = require('./stacked_chart');
const GanttChart = require('./gantt_chart');
const dataFactory = require('./data_factory');
const DataChart = require('./data_chart');

const App = {
  init() {
    const input = document.getElementById('text-input');

    function updateTextboxAndRun(data) {
      const formatted = JSON.stringify(data, null, 2);
      input.value = formatted;
      App.run(data);
    }

    App.loadInitialData().then(updateTextboxAndRun);

    document.getElementById('process-text-input').addEventListener('click', () => {
      const dataString = input.value;
      const data = JSON.parse(dataString);
      updateTextboxAndRun(data);
    });

    document.getElementById('json-load-button').addEventListener('click', () => {
      const url = document.getElementById('json-url').value;
      const newQueryString = queryString.stringify({
        json: url
      });

      location.search = `?${newQueryString}`;
    });
  },

  loadInitialData() {
    const search = location.search.slice(1);
    const queryParams = queryString.parse(search);

    if (queryParams.json) {
      return fetch(queryParams.json)
        .then(response => response.json());
    }

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
