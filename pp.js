// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//     db.findById(id, function (err, user) {
//         done(err, user);
//     });
// });
// passport.use(new LocalStrategy(function (username, password, done) {
//     db.findOne({ 'username': username }, function (err, student) {
//         if (err) 
//         return done(err, { message: message });
//         var pass_retrieved = student.pass_word;
//         bcrypt.compare(password, pass_retrieved, function (err3, correct) {
//             if (err3) {
//                 message = [{ "msg": "Incorrect Password!" }];
//                 return done(null, false, { message: message });
//             } if (correct) {
//                 return done(null, student);
//             }
//         });
//     });
// }));

// app.post('/', passport.authenticate('local',
//     { successRedirect: '/users', failureRedirect: '/' }),
//     function (req, res, next) {

//     })