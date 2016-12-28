'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
var shell = require("shelljs");

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/screenshot/{url}',
        //config:{cors : true},
        handler: function (request, reply) {
            const randomNum = Math.floor(new Date().valueOf() + Math.random());
            var url = request.params.url;
            if (url == '') {
                reply("Url not specified");
            }
            url = (url.indexOf('://') == -1) ? 'http://' + url : url;
            //console.log(' phantomjs screenshot.js '+ url + ' ' + randomNum + '.png');
            console.log('creating screenshot for: ' + url);
            shell.exec(' phantomjs screenshot.js ' + url + ' ' + randomNum + '.png');
            reply.file('./images/' + randomNum + '.png');
            console.log('Screenshot created for: ' + url);
        }
    });
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});