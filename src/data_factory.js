'use strict';

const moment = require('moment');

const DataFactory = {
  from(data) {
    const stageData = new DataFactory._StageData(data);
    return stageData;
  }
};

DataFactory._StageData = class StageData {
  constructor(data) {
    this._data = data;
  }

  getData() {
    return this._data;
  }

  getStages() {
    const stages = this._data.map(group => {
      return group.stages.map(stage => stage.stage);
    })
    .reduce((arr1, arr2) => arr1.concat(arr2))

    return Array.from(new Set(stages));
  }

  getStackedTimeRange() {
    const times = this.getStackedDataFormat()
    .map(group => {
      return Object.keys(group)
      .filter(key => key !== 'id')
      .reduce((acc, key) => {
        acc += group[key];
        return acc;
      }, 0);

      return keys;
    });

    return [0, Math.max.apply(null, times)];
  }

  getStackedDataFormat() {
    return this._data.map(group => {
      const startTime = group.stages[0].start;

      return group.stages.map(stage => {
        stage.start = stage.start - startTime;
        stage.end = stage.end - startTime;
        return stage;
      })
      .reduce((acc, stage) => {
        acc[stage.stage] = stage.end - stage.start;
        return acc;
      }, {
        id: group.id
      });
    });
  }
};

module.exports = DataFactory;
