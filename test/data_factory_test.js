'use strict';

const assert = require('chai').assert;
const dataFactory = require('../src/js/data_factory');

describe('DataFactory', () => {
  let stageData;

  describe('.from', () => {
    it('should return a StageData instance', () => {
      const stageData = dataFactory.from(getFakeData());
      assert.instanceOf(stageData, dataFactory._StageData);
    });
  });

  describe('StageData', () => {
    describe('.cleanData', () => {
      it('should filter out stages without a start and end', () => {
        const data = [{
          id: 1,
          stages: [{
            stage: 'stage1',
            end: 1005
          }, {
            stage: 'stage2',
            start: 1006
          }, {
            stage: 'stage3',
            start: 1009,
            end: 1011
          }]
        }];
        const stageData = dataFactory.from(data);
        stageData.cleanData();

        assert.deepEqual(stageData.getData(), [{
          id: 1,
          stages: [{
            stage: 'stage3',
            start: 1009,
            end: 1011
          }]
        }]);
      });

      it('should remove groups that have no valid stages', () => {
        const data = [{
          id: 1,
          stages: [{
            stage: 'stage1',
            end: 1005
          }]
        }, {
          id: 2,
          stages: [{
            stage: 'stage3',
            start: 1009,
            end: 1011
          }]
        }];
        const stageData = dataFactory.from(data);
        stageData.cleanData();

        assert.deepEqual(stageData.getData(), [{
          id: 2,
          stages: [{
            stage: 'stage3',
            start: 1009,
            end: 1011
          }]
        }]);
      });

      it('should be an empty array if no valid groups', () => {
        const data = [{
          id: 1,
          stages: [{
            stage: 'stage1',
            end: 1005
          }]
        }, {
          id: 2,
          stages: [{
            stage: 'stage3',
            start: 1009,
          }]
        }];
        const stageData = dataFactory.from(data);
        stageData.cleanData();

        assert.deepEqual(stageData.getData(), []);
      });
    });

    describe('.getData', () => {
      it('should return the data', () => {
        const fakeData = getFakeData();
        const stageData = dataFactory.from(fakeData);
        assert.deepEqual(fakeData, stageData.getData());
      });
    });

    describe('.getStages', () => {
      it('should return an array of stages', () => {
        const stageData = dataFactory.from(getFakeData());
        assert.sameMembers(['stage1', 'stage2', 'stage3'], stageData.getStages());
      });
    });

    describe('.getLastId', () => {
      it('should return the id for the last group', () => {
        const stageData = dataFactory.from(getFakeData());
        assert.strictEqual(2, stageData.getLastId());
      });
    });

    describe('.getStackedTimeRange', () => {
      it('should return the range of the stage times', () => {
        const stageData = dataFactory.from(getFakeData());
        assert.deepEqual([0, 6], stageData.getStackedTimeRange());
      })
    });

    describe('.getStackedDataFormat', () => {
      it('should return an array of stages', () => {
        const stageData = dataFactory.from(getFakeData());
        assert.deepEqual(stageData.getStackedDataFormat(), [{
          id: 1,
          stage1: 4,
          stage2: 2,
          stage3: 0
        }, {
          id: 2,
          stage1: 2,
          stage2: 0,
          stage3: 3
        }]);
      });
    });

    describe('.getCriticalPathStackedDataFormat', () => {
      it('should return the critical path stages', () => {
        const fakeData = [{
          id: 1,
          stages: [{
            stage: 'stage1',
            start: 1001,
            end: 1005
          }, {
            stage: 'stage2',
            start: 1003,
            end: 1007
          }, {
            stage: 'stage3',
            start: 1006,
            end: 1008
          }]
        }, {
          id: 2,
          stages: [{
            stage: 'stage1',
            start: 1010,
            end: 1015
          }, {
            stage: 'stage2',
            start: 1008,
            end: 1016
          }, {
            stage: 'stage3',
            start: 1011,
            end: 1013
          }]
        }];

        const stageData = dataFactory.from(fakeData);

        assert.deepEqual(stageData.getCriticalPathStackedDataFormat(), [{
          id: 1,
          stage1: 4,
          stage2: 0,
          stage3: 2
        }, {
          id: 2,
          stage1: 0,
          stage2: 8,
          stage3: 0
        }]);
      });
    });

    describe('.getGanttDataFormat', () => {
      it('should return an array of stages', () => {
        const stageData = dataFactory.from(getFakeData());

        assert.deepEqual(stageData.getGanttDataFormat(2), [{
          stage: 'stage3',
          start: 1,
          end: 4
        }, {
          stage: 'stage1',
          start: 0,
          end: 2
        }]);
      });
    });
  });
});

function getFakeData() {
  return [{
    id: 1,
    stages: [{
      stage: 'stage1',
      start: 1001,
      end: 1005
    }, {
      stage: 'stage2',
      start: 1006,
      end: 1008
    }]
  }, {
    id: 2,
    stages: [{
      stage: 'stage3',
      start: 1011,
      end: 1014
    }, {
      stage: 'stage1',
      start: 1010,
      end: 1012
    }]
  }];
}
