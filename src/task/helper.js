'use strict';

const RTMTask = require('./index.js');
const taskIds = require('../utils/taskIds.js');

/**
 * API Call: rtm.tasks.getList
 * @param [filter] Task Filter
 * @param user RTMUser
 * @param callback Callback function(err, tasks)
 * @private
 */
function get(user, filter, callback) {
  let params = {};
  if ( callback === undefined && typeof filter === 'function' ) {
    callback = filter;
  }
  else if ( filter !== '' ) {
    params.filter = filter;
  }

  user.get('rtm.tasks.getList', params, function(err, resp) {
    if ( err ) {
      return callback(err);
    }

    // List of task to return
    let rtn = [];

    // Parse each List
    let lists = resp.tasks.list;
    if ( lists !== undefined ) {
      for ( let i = 0; i < lists.length; i++ ) {
        let list = lists[i];

        // Parse the List's TaskSeries
        if ( list.taskseries ) {
          if ( !Array.isArray(list.taskseries) ) {
            list.taskseries = [list.taskseries];
          }
          for ( let j = 0; j < list.taskseries.length; j++ ) {
            let series = list.taskseries[j];

            // Parse the TaskSeries' Tasks
            if ( !Array.isArray(series.task) ) {
              series.task = [series.task];
            }
            for ( let k = 0; k < series.task.length; k++ ) {
              let task = series.task[k];
              rtn.push(new RTMTask(user.id, list.id, series, task));
            }
          }
        }
      }
    }

    // Save the task indices
    taskIds.save();

    // Return with the callback
    return callback(null, rtn);

  });
}

/**
 * API Call rtm.tasks.add
 * Note: this uses RTM's 'smart add'
 * @param {string} name Task Name (or smart add syntax)
 * @param {{due: *, priority: *, list: *, tags: *, location: *, start: *, repeat: *, estimate: *, to: *, url: *, note: *}} props Additional task properties
 * @param user RTM User
 * @param callback Callback function(err)
 * @private
 */
function add(name, props, user, callback) {

  // Parse the props keys
  if ( props.due ) {
    name = name + " ^" + props.due;
  }
  if ( props.priority ) {
    name = name + " !" + props.priority
  }
  if ( props.list ) {
    name = name + " #" + props.list;
  }
  if ( props.tags ) {
    if ( !Array.isArray(props.tags) ) {
      props.tags = [props.tags];
    }
    for ( let i = 0; i < props.tags.length; i++ ) {
      name = name + " #" + props.tags[i];
    }
  }
  if ( props.location ) {
    name = name + " @" + props.location;
  }
  if ( props.start ) {
    name = name + " ~" + props.start;
  }
  if ( props.repeat ) {
    name = name + " *" + props.repeat;
  }
  if ( props.estimate ) {
    name = name + " =" + props.estimate;
  }
  if ( props.to ) {
    name = name + " +" + props.to;
  }
  if ( props.url ) {
    name = name + " " + props.url;
  }
  if ( props.note ) {
    name = name + " //" + props.note;
  }

  // Set the request params
  let params = {
    timeline: user.timeline,
    name: name,
    parse: '1'
  };

  // Make the API Request
  user.get('rtm.tasks.add', params, function(err) {
    return callback(err);
  });

}


/**
 * API Call: rtm.tasks.complete
 * @param listId RTM List ID
 * @param taskSeriesId RTM Task Series ID
 * @param taskId RTM Task ID
 * @param user RTM User
 * @param callback function(err)
 * @private
 */
function complete(listId, taskSeriesId, taskId, user, callback) {
  let params = {
    timeline: user.timeline,
    list_id: listId,
    taskseries_id: taskSeriesId,
    task_id: taskId
  };
  user.get('rtm.tasks.complete', params, function(err) {
    return callback(err);
  });
}

/**
 * API Call: rtm.tasks.setPriority
 * @param listId RTM List ID
 * @param taskSeriesId RTM Task Series ID
 * @param taskId RTM Task ID
 * @param priority Task Priority
 * @param user RTM User
 * @param callback function(err)
 * @private
 */
function priority(listId, taskSeriesId, taskId, priority, user, callback) {
  let params = {
    timeline: user.timeline,
    list_id: listId,
    taskseries_id: taskSeriesId,
    task_id: taskId,
    priority: priority
  };
  user.get('rtm.tasks.setPriority', params, function(err) {
    return callback(err);
  });
}



module.exports = {
  get: get,
  add: add,
  complete: complete,
  priority: priority
};