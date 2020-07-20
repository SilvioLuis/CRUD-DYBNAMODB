const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');

app.set('port', process.env.PORT || 8000); //3000
app.use(morgan('dev'));
app.use(cors());
app.use(busboy());
app.use(busboyBodyParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./src/routes/api.routes.js'));

app.listen(app.get('port'), function () {
  console.log('WS escutando porta ' + app.get('port'));
});
