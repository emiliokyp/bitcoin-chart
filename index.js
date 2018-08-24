const express = require('express');
const chart = require('chart.js');
const pug = require('pug');

const PORT = process.env.PORT || 3000;

// Initialise app
const app = (module.exports = express());

// Templating setup (pug)
app.use(express.Router());
app.use(express.static('./public'));
app.use(express.static('../public'));

//Routes
require('./routes')(app);

app.listen(PORT, () => {
  console.log('server started');
});
