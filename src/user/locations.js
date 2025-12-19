'use strict';

const _locations = require('../location/helper.js');


/**
 * This module returns the RTM location-related functions for the RTMUser
 * @param {RTMUser} user RTM User instance
 * @returns {{get: function}}
 * @private
 */
module.exports = function(user) {
  let rtn = {};

  /**
   * Get the list of RTM Lists for this User from the API Server
   * @param {function} callback Callback function(err, lists)
   * @param {RTMError} callback.err RTM API Error Response, if encountered
   * @param {RTMList[]} callback.lists List of User's RTM Lists
   * @function RTMUser~lists/get
   */
  rtn.get = function(callback) {
    _locations.get(user, callback);
  };

  return rtn;
};