var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var debug = require('debug')('api:server');
var http = require('http');
var cors = require('cors');

var config = require('./config/config')
var signInRouter = require('./routes/signin')
var subjectRouter = require('./routes/subjects')
var assignmentRouter = require('./routes/assignments')
var profileRouter = require('./routes/profile')
var timetableRouter = require('./routes/timetable')

require('./passport/passportJWT')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'build')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'build','index.html'))
})
app.use(cors());

app.use('/api', signInRouter)
app.use('/api/subjects', subjectRouter)
app.use('/api/assignments', assignmentRouter)
app.use('/api/user', profileRouter)
app.use('/api/timetable', timetableRouter)

var port = normalizePort(config.app.port);
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log("\n\n\nListening to the server on http://localhost:" + port + "\n\n\n");
}
