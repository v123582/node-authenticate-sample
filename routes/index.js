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

    var sess = req.session;
    var user = findUser(req.body.username, req.body.password);

    if(user){
        req.session.regenerate(function(err) {
            req.session.loginUser = user.username;
            res.cookie("loginUser", user.username);
            res.redirect('/success');
        });
    } else {
        res.redirect('/fail');
    }
});

router.get('/logout', function(req, res, next){
    req.session.destroy(function(err) {
        res.clearCookie('user_sid');
        res.clearCookie('loginUser');
        res.redirect('/');
    });
});

router.get('/success', function (req, res) {
  if(!req.session.loginUser){
    return res.redirect('/login');
  }
  return res.render('success');
});

router.get('/fail', function (req, res) {
  res.send('登入失敗');
});

router.get('/dashboard', function (req, res) {
  res.json(req.session);
});

module.exports = router;
