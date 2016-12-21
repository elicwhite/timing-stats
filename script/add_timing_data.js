#!/usr/bin/env node

/* eslint-disable no-console */

'use strict';

const ghpages = require('gh-pages');
const path = require('path');

const rootPath = path.join(__dirname, '..');

ghpages.publish(rootPath, {
  src: 'sample_data.json',
  add: true,
  branch: 'master',
  message: 'Updating sample data [skip ci]',
  repo: 'https://' + process.env.GH_TOKEN + '@github.com/thesavior/timing-stats.git',
  user: {
    name: 'Eli White',
    email: 'github@eli-white.com'
  }
}, (err) => {
  if (err) {
    console.error('Error pushing sample data update');
    console.error(err.message);
    console.error(err.stack);
    process.exit(1);
  }
});
