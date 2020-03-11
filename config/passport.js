const LocalStrategy = require('passport-local').Strategy

var users = [
    { username: 'root', password: '12345678' }
]
var findUser = function(username, password){
    return users.find(function(item){
        return item.username === username && item.password === password;
    });
};

module.exports = passport => {
  
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (email, password, done) => {
      var user = findUser(email, password);
      if (!user) {
        return done(null, false, { message: 'That email is not registered' })
      }
      return done(null, user)
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    return done(null, user)
  })

}