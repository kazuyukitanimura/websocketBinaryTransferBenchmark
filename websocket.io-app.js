/**
 * Module dependencies.
 */

var fs = require('fs');
var ws = require('websocket.io');

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

var wsServer = ws.attach(app);

wsServer.on('connection', function(connection) {
  connection.on('message', function(message) {
    connection.send(message);
  });
});

