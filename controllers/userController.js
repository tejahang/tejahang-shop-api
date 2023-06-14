const knex = require('./../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// A. Sign-up Controller
exports.createUsers = async (req, res) => {
  try {
    const { firstName, lastName, email, password1 } = req.body;

    // 1. Check if user already exists
    let users = await knex('users').where({ email: email });
    if (users.length > 0) {
      throw Error('Email already taken');
    }

    // 2. hashing
    const password = await bcrypt.hash(password1, 10);

    // 3. Creating user
    const user = await knex('users').insert({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    });
    res.send({ user }); // return user
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Creating json-web-token (JWT)
const maxAge = 3 * 24 * 60 * 60; // in 3 days in seconds
const createToken = (id) => {
  // passing payload : { id: id }
  return jwt.sign({ id: id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

// B. Login Controller
exports.loginUsers = async (req, res) => {
  res.cookie('name', 'true');
  try {
    const { email, password } = req.body;

    // // // 1. Check if user exists
    let user = await knex('users').where({ email: email });
    if (user.length === 0) {
      throw Error('Invalid Email');
    }

    // // // 2. Compare passwords
    let result = await bcrypt.compare(password, user[0].password);
    if (!result) {
      throw Error('Invalid Credentials');
    }

    // // 3. token + cookie +
    const token = createToken(user[0].id); // calling createToken() with 'id' to create token
    // res.cookie('jwt', '', { maxAge: maxAge * 1000 });
    res.locals.user = user;
    res.status(201).json({ token, user: user[0] });
  } catch (err) {
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(400).json({ msg: err.message });
  }
};
