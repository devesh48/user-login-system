var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeauth');

var bcrypt = require('bcrypt');

var db = mongoose.connection;

//User schema
var UserSchema = mongoose.Schema({
    username : {
        type : String,
        index : true
    },
    password : {
        type : String, bcrypt:true
    },
    email : {
        type : String
    },
    name : {
        type : String
    },
    profileImage: {
        type : String
    }
});

var users = module.exports = mongoose.model('User', UserSchema);

module.exports.createUsers = function (newUser,callback){
    bcrypt.hash(newUser.password,10,function(err,hash){
        if (err)throw err;
        //Set Hashed password
        newUser.password = hash;
        //Create User
        newUser.save(callback);
    });

}