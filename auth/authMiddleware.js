const jwt = require('jsonwebtoken');
const knex = require('./../db/database');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // throw Error('unsuccessful');
        res.send('unsuccessful');
      } else {
        console.log(decodedToken);
        // let user = await knex('users').where({ id: decodedToken.id });
        // res.locals.user = user;
        next();
      }
    });
  } else {
    // throw Error('unsuccessful');
    // res.redirect('/login');
    res.send('unsuccessful');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies);
  console.log(token);

  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await knex('users').where({ id: decodedToken.id });
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
