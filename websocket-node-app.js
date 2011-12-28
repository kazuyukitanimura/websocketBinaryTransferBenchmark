/**
 * Module dependencies.
 */

var fs = require('fs');
var WebSocketServer = require('websocket').server;

/**
 * ARGV Set
 */
var Protocol = process.argv[2] ? 'https': 'http' // the first argument
if (Protocol === 'https') {
  var ServerName = 'server';
  var options = {
    key: fs.readFileSync(ServerName + '.key'),
    cert: fs.readFileSync(ServerName + '.cert')
  };
}

var app = require(Protocol).createServer((Protocol === 'https') ? options: undefined);
app.listen(8082);

var wsServer = new WebSocketServer({
  httpServer: app,
  maxReceivedMessageSize: 0x40000000 // 1GiB max message size,
});

wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  connection.on('message', function(message) {
    connection.sendBytes(message.binaryData);
  });
});

