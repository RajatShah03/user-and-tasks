const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);

        resolve(hash);
      })
    });
  });
};

const matchPassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, (err, isPasswordMatch) => {
      if (err) reject(err);
      else resolve(isPasswordMatch);
    });
  });
};

module.exports = { hashPassword, matchPassword };