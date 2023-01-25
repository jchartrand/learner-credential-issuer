import express, { request } from 'express';

var router = express.Router();

/* GET home page. 
This doesn't do anything right now except show a title.
The important endpoints are in /routes/credentials.js and in routes/eduGainDemo.js
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Learner Credential Issuer' });
});

router.get('/healthz', function(req, res, next) {
  res.sendStatus(200);
});
export default router
