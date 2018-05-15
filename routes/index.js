var express = require('express');
var router = express.Router();
var helper = require('../helpers/helper.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '\u0987\u0982\u09B0\u09C7\u099C\u09C0-\u09AC\u09BE\u0982\u09B2\u09BE \u0985\u09AD\u09BF\u09A7\u09BE\u09A8 \u098F\u09A1\u09BF\u099F\u09B0' });
});

/* POST add new word. */
router.post('/addnew', function(req, res) {
    // console.log(JSON.stringify(req.body));
    // console.log('==========')
    try {
        dict = helper.processInputDict(req.body);
        console.log(JSON.stringify(dict));
        res.json({
            success: true,
            data: {
                message: 'Entry saved'
            }
        });
    } catch(err) {
        console.log('Error occurred: ' + err.stack);
        res.json({
            success: false,
            data: {
                message: 'Failed to save entry!'
            }
        });
    }
});

module.exports = router;
