const request = require('request');
const SECRETS = require('../secrets');
const path = require('path');

let url = 'https://api.bitfinex.com/v1';

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index.html');
  });

  app.get('/chart', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/chart.html'));
  });

  app.get('/api/chart', (req, res) => {
    request(
      `https://blockchain.info/charts/market-price?timespan=500days&format=json`,
      (err, apiRes, body) => {
        res.send(body);
      }
    );
  });

  app.get('/api/chart/:id', (req, res) => {
    let days = req.url.substr(req.url.lastIndexOf('/') + 1);
    request(
      `https://blockchain.info/charts/market-price?timespan=${days}days&format=json`,
      (err, apiRes, body) => {
        res.send(body);
      }
    );
  });
};
