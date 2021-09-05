const mongoose = require("mongoose");

// I used a tutorial at this website to implement saving the password as a hash and implementing comparison function
// https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt

let UserSchema = mongoose.Schema({
  username: String,
  password: String,
  toDoArray: [],
});

// UserSchema.pre("save", function (next) {
//   const user = this;

//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, function (saltError, salt) {
//       if (saltError) {
//         console.log(saltError);
//         return next(saltError);
//       } else {
//         bcrypt.hash(user.password, salt, function (hashError, hash) {
//           if (hashError) {
//             console.log(hashError);
//             return next(hashError);
//           }

//           user.password = hash;
//           next();
//         });
//       }
//     });
//   } else {
//     return next();
//   }
// });

// UserSchema.methods.comparePassword = function (password, callback) {
//   bcrypt.compare(password, this.password, function (error, isMatch) {
//     if (error) {
//       return callback(error);
//     } else {
//       callback(null, isMatch);
//     }
//   });
// };

module.exports = mongoose.model("Users", UserSchema);
