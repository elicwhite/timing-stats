'use strict';

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

  cleanData() {
    this._data = this._data.map(group => {
      group.stages = group.stages.filter(stage => stage.start !== undefined && stage.end !== undefined);
      return group;
    }).filter(group => group.stages.length > 0);
  }

  getData() {
    return this._data;
  }

  getStages() {
    const stages = this._data.map(group => {
      return group.stages.map(stage => stage.stage);
    })
    .reduceRight((arr1, arr2) => arr1.concat(arr2));

    return Array.from(new Set(stages));
  }

  getLastId() {
    return this._data[this._data.length - 1].id;
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
    });

    return [0, Math.max.apply(null, times)];
  }

  getStackedDataFormat() {
    const groups = this._data.map(group => {
      return this._normalizeStages(group.stages)
        .reduce((acc, stage) => {
          acc[stage.stage] = stage.end - stage.start;
          return acc;
        }, {
          id: group.id
        });
    });

    return this._ensureStagesAcrossGroups(groups);
  }

  getCriticalPathStackedDataFormat() {
    const groups = this._data.map(group => {
      const reverseSortedStages = group.stages
        .slice(0)
        .sort((stage1, stage2) => {
          return stage2.end - stage1.end;
        });

      const criticalStages = reverseSortedStages.reduce((acc, stage) => {
        if (stage.end <= acc[acc.length - 1].start) {
          acc.push(stage);
        }

        return acc;
      }, [reverseSortedStages[0]]);

      return this._normalizeStages(criticalStages)
        .reduce((acc, stage) => {
          acc[stage.stage] = stage.end - stage.start;
          return acc;
        }, {
          id: group.id
        });
    });

    return this._ensureStagesAcrossGroups(groups);
  }

  getGanttDataFormat(id) {
    const group = this._data.filter(group => group.id === id);
    if (!group.length) {
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
      return Object.assign({}, stage, {
        start: stage.start - startTime,
        end: stage.end - startTime
      });
    });
  }

  _ensureStagesAcrossGroups(groups) {
    const allKeys = groups.map(group => Object.keys(group))
    .reduce((keys1, keys2) => keys1.concat(keys2));

    const uniqueKeys = Array.from(new Set(allKeys));

    return groups.map(group => {
      uniqueKeys.forEach(key => {
        group[key] = group[key] === undefined ? 0 : group[key];
      });

      return group;
    });
  }
};

module.exports = DataFactory;
