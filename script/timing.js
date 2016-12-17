#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const rootPath = path.join(__dirname, '..');
const filePath = path.join(rootPath, 'temporary_build_data.txt');

// Make sure the file exists
const args = process.argv;

// the first two arguments are special
if (args.length !== 4) {
  throw new Error('Expected two arguments');
  process.exit(1);
}

if (['START', 'STOP'].indexOf(args[2]) === -1) {
  throw new Error('First argument must be START or STOP');
  process.exit(1);
}

if (args[3].indexOf('::') !== -1) {
  throw new Error("Second argument can't contain ::");
  process.exit(1);
}

fs.writeFileSync(filePath, `${args[2]}::${args[3]}::${Date.now()}\n`, {
  flag: 'a'
});
