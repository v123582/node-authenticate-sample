var express = require('express');
var router = express.Router();


var users = [
    { username: 'root', password: '12345678' }
]
var findUser = function(username, password){
    return users.find(function(item){
        return item.username === username && item.password === password;
    });
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next){
    res.render('login');
});

router.post('/login', function(req, res, next){

    var user = findUser(req.body.username, req.body.password);

    if(user){
        res.redirect('/success');
    } else {
        res.redirect('/fail');
    }
});

router.get('/success', function (req, res) {
  res.send('登入成功');
});

router.get('/fail', function (req, res) {
  res.send('登入失敗');
});

module.exports = router;
