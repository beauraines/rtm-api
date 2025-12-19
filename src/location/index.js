'use strict';


/**
 * ### RTM Location
 *
 * This Class is used to represent the properties of an RTM Location.
 *
 * All of the location properties from RTM are directly accessible from this Class.
 *
 * ```
 * let location = new RTMLocation(...);
 * let name = location.name;
 * ```
 * @class
 */
class RTMLocation {

  /**
   * Create a new RTM Location
   * @param {object} props The properties from the RTM API response `resp.locations.location`
   */
  constructor(props) {

    /**
     * Location ID
     * @type {Number}
     */
    this.id = parseFloat(props.id);

    /**
     * Location Name
     * @type {string}
     */
    this.name = props.name;

  
    /**
     * Location Longitude
     * @type {Number}
     */
    this.longitude = parseInt(props.longitude);

    /**
     * Location Latitude
     * @type {Number}
     */
    this.latitude = parseInt(props.latitude);


    /**
     * Location Zoom
     * @type {Number}
     */
    this.zoom = parseInt(props.zoom);

    /**
     * Location Address
     * @type {string}
     */
    this.address = props.address;
  
  }

  /**
   * All of the RTM Location properties
   * @type {object}
   */
  get props() {
    let rtn = {};
    for ( let key in this ) {
      if ( this.hasOwnProperty(key) && key !== '_index' ) {
        rtn[key] = this[key];
      }
    }
    return rtn;
  }

}


module.exports = RTMLocation;