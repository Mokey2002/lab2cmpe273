//"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const mysql = require('mysql2');
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "hw4"
});
const secretkey = "cmpe273_secret_key";
// Setup work and export for the JWT passport strategy
function auth() {
    console.log("Inside AUTH function");
    console.log(ExtractJwt.fromAuthHeaderWithScheme("jwt"))
    console.log("Inside AUTH function");
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secretkey
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            console.log(jwt_payload)
            ////new
            db.query(
                "SELECT name From user  where User =?",
                [user_id],
                (err, result) => {
                    console.log("result");
                    console.log(result);
                    console.log(err);
                    console.log("result");
        
                if(err) {
                    res.send({err: err})
                }
                if (result.length > 0 ){
                    console.log("Inside result > 0")
                    callback(null, result);
                }
                else{

                    console.log("else inside passport")
                    //return unsuccesful to front end
                    callback(null, false);
                }
                }
            );



            // end new

        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


