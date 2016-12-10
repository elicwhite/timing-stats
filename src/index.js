'use strict';

const onDomReady = require('./on_dom_ready');

onDomReady.queue(() => {
  document.getElementById('process-text-input').addEventListener('click', () => {
    console.log('got', document.getElementById('text-input').value);
  });
});
