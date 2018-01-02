//var settings = {network: 'test'}
//var acceptBitcoin = require('accept-bitcoin');
//var ac = new acceptBitcoin('YOUR_BITCOIN_ADDRESS', settings);
//existingKey = ac.generateAddress(settings, 'Your Public key', 'your private key in WIF format');

//existingKey.payTo('address to pay to', {amount: 0.1, fee: 0.0001}, function(err, response){
//  if (response.status == 'success')
//    console.log("WOHOO! DONE");
//});

var mysqlpool = require('../../config/database.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var sanitizer = require('sanitizer');
var cred = require('../../config/credentials.js');
var settings = {network: 'test'}
//var acceptBitcoin = require('accept-bitcoin');




module.exports = function(app, passport, verificationMail) {


    app.get('/payment', verificationMail.verificate,
    function(req, res) {
        //generate payment id
       // var ac = new acceptBitcoin('mtFez5mTXgf3YC1LXLzgPZtLhvgWQSfHQy', settings);
        //existingKey = ac.generateAddress(settings, 'tpubDCuPgbeo46ycUMMo6jhXzhb6MjZugYjwbQqmbw9Xn3r5GgkDKbWXUkbor4YnVTvB2ez89GJKDp7LH7ja9eoL45hLT7gu59M2FzXoraqdt4r', 'tprv8ZgxMBicQKsPenQNCscBf5wfkF68hHUERWVB2XdXwmmc9aCDHkDTB5TcV39jbEm3VkTBE7QZyyL4XMtZGMmLz2yS8EcmtVwr7yTyqBxYno5');


       // existingKey.payTo('mtFez5mTXgf3YC1LXLzgPZtLhvgWQSfHQy', {amount: 0.001, fee: 0.0001}, function(err, response){
       // if (response.status == 'success')
        //    console.log("WOHOO! DONE");
        //});
       
        res.render(__dirname + '/payment.ejs', {
            message: req.flash('loginMessage'),
            isLoggedIn: req.isAuthenticated(),
            layoutPath: '../../views/',
            btc_adress: 'mtFez5mTXgf3YC1LXLzgPZtLhvgWQSfHQy',
            btc_amount: '0.001'
        }); 
});



}