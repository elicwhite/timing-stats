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
      return this._normalizeStages(group.stages)
      .reduce((acc, stage) => {
        acc[stage.stage] = stage.end - stage.start;
        return acc;
      }, {
        id: group.id
      });
    });
  }

  getGanttDataFormat(id) {
    const group = this._data.filter(group => group.id === id);
    if(!group.length) {
      throw new Error('no group found with that id');
    }

    return this._normalizeStages(group[0].stages)
    .sort((stage1, stage2) => {
      return stage2.start - stage1.start;
    });
  }

  _normalizeStages(stages) {
    const startTime = stages.reduce((prev, stage) => {
      return Math.min(prev, stage.start);
    }, stages[0].start);

    return stages.map(stage => {
      stage.start = stage.start - startTime;
      stage.end = stage.end - startTime;
      return stage;
    })
  }
};

module.exports = DataFactory;
