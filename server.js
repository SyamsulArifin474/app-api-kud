const express = require("express");
const bodyParser = require("body-parser");
var morgan = require('morgan');
const app = express();

//parse application/json
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//panggil router
var routes = require("./routes");
routes(app);

//mendatarkan menu router dari index
app.use('/auth', require('./middleware'));

app.listen(3001, () => {
  console.log(`Server started on 3001`);
});