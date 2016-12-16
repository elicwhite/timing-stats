#!/usr/bin/env node

var ghpages = require('gh-pages');
var path = require('path');
var fs = require('fs');

const rootPath = path.join(__dirname, '..');

fs.appendFile(
  path.join(path.join(rootPath, 'test_deploy_data.txt'),
  process.env.TRAVIS_JOB_NUMBER,
  function (err) {
    if (err) {
      console.error('Error writing to test_deploy_data.txt');
      console.error(err.message);
      process.exit(1);
    }
  }
);



ghpages.publish(rootPath, {
  src: 'test_deploy_data.txt',
  add: true,
  branch: 'master',
  message: 'Updating sample data [skip ci]',
  repo: 'https://' + process.env.GH_TOKEN + '@github.com/thesavior/timing-stats.git',
  clone: path.join(rootPath, 'timing_data_temp_dir'),
  user: {
    name: 'Eli White',
    email: 'github@eli-white.com'
  }
}, (err) => {
  if (err) {
    console.error('Error pushing sample data update');
    console.error(err.message);
    process.exit(1);
  }
});
