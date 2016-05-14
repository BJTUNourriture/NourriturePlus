var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var findOrCreate = require('mongoose-findorcreate');

var ShopsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required : true,
        minlength : 3,
        maxlength : 20
    },
	description: {
		type: String,
		maxlength : 10000
	},
  position: {
      type: String,
      unique: true,
      required : true,
      minlength : 3,
      maxlength : 20
  }
});

ShopsSchema.pre('save', function (callback) {
    var user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password'))
        return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});



// Export the Mongoose model
module.exports = mongoose.model('Shops', UserSchema);
