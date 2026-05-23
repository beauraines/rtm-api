'use strict';

const RTMTask = require('./index.js');

// Minimal series and task objects mimicking RTM API response structure
function makeSeries(overrides = {}) {
  return Object.assign({
    id: '100',
    created: '2025-01-01T00:00:00Z',
    modified: '2025-01-01T00:00:00Z',
    name: 'Test Task',
    source: 'api',
    url: '',
    location_id: '',
    tags: {},
    participants: {},
    notes: {},
    parent_task_id: ''
  }, overrides);
}

function makeTask(overrides = {}) {
  return Object.assign({
    id: '200',
    due: '',
    has_due_time: '0',
    start: '',
    has_start_time: '0',
    added: '2025-01-01T00:00:00Z',
    completed: '',
    deleted: '',
    priority: 'N',
    postponed: '0',
    estimate: ''
  }, overrides);
}

describe('RTMTask', () => {

  describe('subtask properties', () => {
    test('isSubtask is false when parent_task_id is empty', () => {
      const task = new RTMTask(1, '10', makeSeries(), makeTask());
      expect(task.isSubtask).toBe(false);
      expect(task.parentTaskId).toBeUndefined();
    });

    test('isSubtask is true when parent_task_id is set', () => {
      const series = makeSeries({ parent_task_id: '999' });
      const task = new RTMTask(1, '10', series, makeTask());
      expect(task.isSubtask).toBe(true);
      expect(task.parentTaskId).toBe(999);
    });

    test('hasSubtasks defaults to false', () => {
      const task = new RTMTask(1, '10', makeSeries(), makeTask());
      expect(task.hasSubtasks).toBe(false);
      expect(task.subtaskIds).toEqual([]);
    });

    test('hasSubtasks can be set externally', () => {
      const task = new RTMTask(1, '10', makeSeries(), makeTask());
      task.hasSubtasks = true;
      task.subtaskIds.push(300);
      expect(task.hasSubtasks).toBe(true);
      expect(task.subtaskIds).toEqual([300]);
    });
  });

});
