'use strict';

const d3 = require('d3');

class DataChart {
  constructor(stageData) {
    this._stageData = stageData;
    this._colorScale = undefined;
  }

  getStageColorScale() {
    if (!this._colorScale) {
      this._colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(this._stageData.getStages());
    }

    return this._colorScale;
  }
}

module.exports = DataChart;
