'use strict';

const assert = require('chai').assert;
const dataFactory = require('../src/data_factory');

describe('DataFactory', () => {
  let fakeData;
  let stageData;

  beforeEach(() => {
    fakeData = [{
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
        stage: 'stage1',
        start: 1010,
        end: 1012
      }, {
        stage: 'stage3',
        start: 1011,
        end: 1014
      }]
    }];

    stageData = dataFactory.from(fakeData);
  });

  describe('.from', () => {
    it('should return a StageData instance', () => {
      assert.instanceOf(stageData, dataFactory._StageData);
    });
  });

  describe('StageData', () => {
    describe('.getData', () => {
      it('should return the data', () => {
        assert.deepEqual(fakeData, stageData.getData());
      });
    });

    describe('.getStages', () => {
      it('should return an array of stages', () => {
        assert.sameMembers(['stage1', 'stage2', 'stage3'], stageData.getStages());
      });
    });

    describe('.getStackedTimeRange', () => {
      it('should return the range of the stage times', () => {
        assert.deepEqual([0, 6], stageData.getStackedTimeRange());
      })
    });

    describe('.getStackedDataFormat', () => {
      it('should return an array of stages', () => {
        assert.deepEqual(stageData.getStackedDataFormat(), [{
          id: 1,
          stage1: 4,
          stage2: 2
        }, {
          id: 2,
          stage1: 2,
          stage3: 3
        }]);
      });
    });
  });
});
