// Environment Variable
const HTTP_PORT = 8888;



// Local Dependencies
const Log = require('../libs/log');

// Extern Dependencies
const express = require('express'),
      http = require('http'),
      app = express();


// Create & Bind Server
var httpServer = http.createServer(app);

var httpListener = httpServer.listen(HTTP_PORT, () => {
  var addr = httpListener.address();

  Log.info('HTTPServer', `Server is listening on ${addr.address}:${addr.port}`);
});


// Basic Routing
app.use(express.static('www'))