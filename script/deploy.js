#!/usr/bin/env node

var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, '..', 'dist'), {
  repo: 'https://' + process.env.GH_TOKEN + '@github.com/thesavior/timing-stats.git',
  silent: true
}, (err) => {
  if (err) {
    console.error('Error deploying to Github pages');
    throw err;
  }
});
