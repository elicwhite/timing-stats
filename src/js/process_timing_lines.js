'use strict';

const ProcessTimingLines = {
  process(lines) {
    const intermediateStages = lines.trim().split('\n').reduce((acc, line) => {
      const parts = line.split('::');
      const start = parts[0];
      const stage = parts[1];
      const time = parts[2];

      if (!acc[stage]) {
        acc[stage] = {
          stage
        };
      }

      if (start === 'START') {
        acc[stage].start = parseInt(time);
      } else {
        acc[stage].end = parseInt(time);
      }

      return acc;
    }, {});

    return Object.keys(intermediateStages).map(key => {
      return intermediateStages[key];
    });
  }
};

module.exports = ProcessTimingLines;
