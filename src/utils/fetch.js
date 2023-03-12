const fetch = require('node-fetch');
const sign = require('../utils/sign')
const debug = require('debug')('rtm-api-fetch');

// API Configuration Properties
const config = require('../../config');
const scheme = config.api.scheme;
const base = config.api.url.base;
const format = config.api.format;
const version = config.api.version;

function buildUrl(auth,filter) {
  
  let auth_token = auth.token;
  let api_key = auth.key;
  let secret = auth.secret;


  let query = {
    filter ,
    auth_token,
    method: 'rtm.tasks.getList',
    api_key,
    v: version,
    format
  }

  let apiSig=sign(query,{secret})

  let url = `${scheme}://${base}?${formQuery(query)}&api_sig=${apiSig}`
  return url
}




/**
 * Generate a URI Encoded query string from the parameters set of
 * key/value pairs
 * @param {object} params Object containing the key/value parameters
 * @returns {string} URL Encoded query string
 */
function formQuery(params) {
let parts = [];
for ( let key in params ) {
    if ( params.hasOwnProperty(key) ) {
    parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
    }
}
return parts.join("&");
}

/**
 * 
 * @param {string} url fully formed url to call
 * @returns JSON response
 */
async function callAPI(url) {
  try {
      const response = await fetch(url);
      if (await response.ok) {
          const responseJson = await response.json();
	  debug(JSON.stringify(responseJson))
	  return responseJson 
      } else {
          // TODO improve this error message
          console.error('There was an error');
      }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {callAPI,formQuery, buildUrl}
