'use strict';

const errors = require('../response/error.js');
const _lists = require('../list/helper.js');


/**
 * This module returns the RTM list-related functions for the RTMUser
 * @param {RTMUser} user RTM User instance
 * @returns {{get: function, update: function, add: function, remove: function, rename: function}}
 * @private
 */
module.exports = function(user) {
  let rtn = {};

  /**
   * Get the list of RTM Lists for this User from the API Server
   * @param {function} callback Callback function(err, lists)
   * @param {RTMError} callback.err RTM API Error Response, if encountered
   * @param {RTMList[]} callback.list List of User's RTM Lists
   * @function RTMUser~lists/get
   */
  rtn.get = function(callback) {
    _lists.get(user, callback);
  };

  /**
   * Add a new RTM List for this User
   * @param {string} name Name of the new RTM List
   * @param {function} callback Callback function(err, list)
   * @param {RTMError} callback.err RTM API Error Response, if encountered
   * @param {RTMList[]} callback.list List of User's RTM Lists
   * @function RTMUser~lists/add
   */
  rtn.add = function(name, callback) {
    _lists.add(name, user, callback);
  };

  /**
   * Remove the specified RTM List for this User
   * @param {int} index RTM List index
   * @param {function} callback Callback function(err, list)
   * @param {RTMError} callback.err RTM API Error Response, if encountered
   * @param {RTMList[]} callback.list List of User's RTM Lists
   * @function RTMUser~lists/remove
   */
  rtn.remove = function(index, callback) {
    let found = false;
    if ( user._lists ) {
      for ( let i = 0; i < user._lists.length; i++ ) {
        if ( user._lists[i].index === index ) {
          found = true;
          _lists.remove(user._lists[i].id, user, function(err) {
            if ( err ) {
              return callback(err);
            }
            return rtn.update(callback);
          });
        }
      }
    }
    if ( !found ) {
      return callback(errors.indexError());
    }
  };

  /**
   * Rename the specified RTM List for this User
   * @param {int} index RTM List index
   * @param {string} name New RTM List name
   * @param {function} callback Callback function(err, list)
   * @param {RTMError} callback.err RTM API Error Response, if encountered
   * @param {RTMList[]} callback.list List of User's RTM Lists
   * @function RTMUser~lists/rename
   */
  rtn.rename = function(index, name, callback) {
    let found = false;
    if ( user._lists ) {
      for ( let i = 0; i < user._lists.length; i++ ) {
        if ( user._lists[i].index === index ) {
          found = true;
          _lists.rename(user._lists[i].id, name, user, function(err) {
            if ( err ) {
              return callback(err);
            }
            return rtn.update(callback);
          });
        }
      }
    }
    if ( !found ) {
      return callback(errors.indexError());
    }
  };

  return rtn;
};