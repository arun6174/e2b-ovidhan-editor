var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '\u0987\u0982\u09B0\u09C7\u099C\u09C0-\u09AC\u09BE\u0982\u09B2\u09BE \u0985\u09AD\u09BF\u09A7\u09BE\u09A8 \u098F\u09A1\u09BF\u099F\u09B0' });
});

/* POST generate recommendations. */
router.post('/genrecom', function(req, res) {
  // res.render('index', { title: 'RAReS Web App' });

  console.log(req.body);  
  res.json({
    success: 'true'
  });
  return;

});

module.exports = router;
