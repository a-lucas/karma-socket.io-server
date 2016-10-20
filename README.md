# karma-socket.io-server
Launch and configure a Socket.IO server to run your tests against.

## About

- The `socket.io.js` client library is available at the address specified in the `karma.conf` file. By default, `http://localhost:[port]/socket.io/socket.io.js`
- You can test the `allowRequest` functionality
- As many `emit` and `on` as needed.
- You get access to karma's logger.


## Installation

```bash
npm install -g  karma-socket.io-server
```

## Karma Config file : 

```javascript


module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: [ 'karma-socket.io-server'],

        files: [
        ],

        autoWatch: true,

        socketIOServer: {
            // MANDATORY: Which port the server will listen to.
            
            port: 3000,
            
            
            // OPTIONAL: This function allows you to test authorization with handshake. - 
            
            allowRequest: function(handshake, cb) {
                return cb(null, true); // authorize every connections
            },
            
            
            // OPTIONAL: This function takes the socket client which is initialize after the on('connection')
            
            rules: function (socket, log) {
                log.info('Hi I am the karma logger');

                socket.on('SOME_MESSAGE', function( data ) {
                    socket.emit('MESSAGE_RECEIVED');
                });
                
                socket.emit('DID_YOU_RECEIVE', '_this? ');
            }
        },

        plugins: [           
            'karma-socket.io-server'
        ]
    });
};


```

