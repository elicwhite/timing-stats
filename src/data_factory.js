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

  getTimeRange() {
    const times = this._data.map((group) => {
      return group.stages.reduce((acc, stage) => {
        return acc.concat([stage.start, stage.end]);
      }, []);
    })
    .reduce((arr1, arr2) => arr1.concat(arr2))
    .map(time => moment(time).valueOf());

    return [
      Math.min.apply(null, times),
      Math.max.apply(null, times)
    ];
  }

  getStackedDataFormat() {
    return this._data.map(group => {
      const startTime = group.stages[0].start;

      group.stages.map(stage => {
        stage.start = stage.start - startTime;
        stage.end = stage.end - startTime;
        return stage;
      });

      return group;
    })
    .map(group => {
      return group.stages.reduce((acc, stage) => {
        acc[stage.stage] = stage.end - stage.start;
        return acc;
      }, {
        id: group.id
      });
    })
    .reduce((acc, group) => acc.concat(group), []);
  }
};

module.exports = DataFactory;
