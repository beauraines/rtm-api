'use strict';

const RTMLocation = require('./index.js');


/**
 * API Call: rtm.locations.getList
 * @param user RTMUser
 * @param callback Callback function(err, locations)
 * @private
 */
function get(user, callback) {
  user.get('rtm.locations.getList', function(err, resp) {
    if ( err ) {
      return callback(err);
    }

    // List of locations to return
    let rtn = [];

    // Parse each of the locations
    let locations = resp.locations.location;
    for ( let i = 0; i < locations.length; i++ ) {
      rtn.push(
        new RTMLocation(locations[i])
      );
    }

    // Call the callback
    return callback(null, rtn);
  });
}




module.exports = {
  get: get
};