'use strict';

const onDomReady = require('./on_dom_ready');
const criticalPathChart = require('./critical_path_chart');

onDomReady.queue(() => {
  document.getElementById('process-text-input').addEventListener('click', () => {
    console.log('got', document.getElementById('text-input').value);
  });

  criticalPathChart.run();
});
