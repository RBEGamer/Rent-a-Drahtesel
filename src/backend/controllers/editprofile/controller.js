module.exports = function(app, passport, verificationMail) {


    app.get('/login', function(req, res) {

		if(!req.isAuthenticated()) {
			res.redirect('/profile');
        }
        

        var user = req.session.passport.user;
        if(user == undefined){
            res.redirect('/profile');
        }
        var editmode = 0; //0 = invalid // 1= privat // 2 = geschäft


        mysqlpool.getConnection(function(err, connection) {
			if (err) {
				console.log("get connection db failed 0")
				return;
            }
            






		res.render(__dirname +'/editprofile.ejs', { 
			helper: require('../../views/helpers/helper'),
			layoutPath: '../../views/',
			message: req.flash('loginMessage'),
			isLoggedIn: req.isAuthenticated(),
        });
        

        
    });
});
    


}