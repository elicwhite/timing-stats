'use strict';

const assert = require('chai').assert;
const processTimingLines = require('../src/js/process_timing_lines');

describe('processTimingLines', () => {
  it('should convert lines', () => {
    const lines = `
START::mocha::1481963066948
STOP::mocha::1481963067601
START::webpack::1481963068634
STOP::webpack::1481963071327
`;
    const result = processTimingLines.process(lines);

    const expected = [{
      stage: 'mocha',
      start: 1481963066948,
      end: 1481963067601
    }, {
      stage: 'webpack',
      start: 1481963068634,
      end: 1481963071327
    }];

    assert.deepEqual(expected, result);
  });
});
