'use strict';

const onDomReady = require('./on_dom_ready');
const app = require('./app');

onDomReady.queue(app.init);
