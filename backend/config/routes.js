/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST /test': {action: 'test'},

  'GET /csrfToken': {action: 'security/grant-csrf-token'},

  'POST /initdata': {action: 'initdata'},

  /**
   * Player-specific routes.
   */

  'POST /api/register': {controller: 'PlayerController', action: 'registerPlayer'},
  'POST /api/logout': {controller: 'PlayerController', action: 'logout'},

  /**
   * Chat-specific routes.
   */
  'POST /api/retrievemessages': {controller: 'MessageController', action: 'getMessages'},
  'POST /api/sendmessage': {controller: 'MessageController', action: 'sendMessage'},

};
