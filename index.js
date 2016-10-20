
/*
config.socketIOServer = {
    port: number,
    allowRequest: function(handshake, cb) {

    },
    rules: function(socket) {

    }
}
 */

var createSocketIOServer = function (args, config, logger, helper) {
    var log = logger.create('socket.io.server');
    log.info('Starting');


    var httpServer  = require('http').createServer((req, res) => {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('Forbidden');
    });

    var server = require('socket.io').listen(httpServer, {
        allowRequest: function(handshake, cb){
            if(typeof config.socketIOServer.allowRequest === 'function') {
                return config.socketIOServer.allowRequest.apply(this, [handshake, cb]);
            }
            return cb(null, true);
        }
    });


    server.on('connection', function(socket) {
        log.info('New socket connection id:', socket.id);

        if(typeof config.socketIOServer.rules === 'function') {
            config.socketIOServer.rules(socket, log);
        } else {
            log.error('Missing config socketIOServer.rules function');
        }
    });

    httpServer.listen(config.socketIOServer.port);

    log.info('Socket.IO server started on port', config.socketIOServer.port);
};

// PUBLISH DI MODULE
module.exports = {
    'framework:socket-io-server': ['factory', createSocketIOServer]
};
