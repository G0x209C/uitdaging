import socketIOClient from 'socket.io-client';
import SailsIOClient from 'sails.io.js';
import JQuery from 'jquery';


let url;
let csrf;
const isProductionEnvironment = (process.env.NODE_ENV === 'production');

if (isProductionEnvironment) {
    url = ``; //TODO: set production url.
} else url = 'http://localhost:1337';


let io = SailsIOClient(socketIOClient);
io.sails.url = url;
io.sails.environment = process.env.NODE_ENV || 'development';
io.sails.useCORSRouteToGetCookie = true;

// JQuery.ajax({
//     url: `${url}/csrfToken`,
//     contentType: 'json',
//     async: false,
//     success: function (data) {
//         console.log(data);
//         io.sails.headers = {'X-CSRF-Token': data._csrf}
//     },
//     error: function (error) {
//         console.log(error)
//     }
// });
// console.log(io.sails.headers);

export default io;
