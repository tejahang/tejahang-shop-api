const express = require('express');
// const session = require('express-session');
const cors = require('cors');
const { engine } = require('express-handlebars');
const { checkUser } = require('./auth/authMiddleware');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

// const setupPassport = require('./passport/passport');
const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
app.use(cookieParser());

// setupPassport(app);

////////////////////////////////////////////
// MIDDLEWARE
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.static(`${__dirname}/public`)); // static files
app.use(express.json()); // res.body
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', engine({ defaultLayout: 'main' })); //{ defaultLayout: 'main', partialsDir: './views/partials' }
app.set('view engine', 'handlebars'); // set engine

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false },
//   })
// );

////////////////////////////////////////////
// Mounting Routes
app.use('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});
// app.use('*', checkUser);

app.use('/api/products', checkUser, productRoute);
app.use('/api/users', userRoute);

// Handling 404
app.get('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server.`,
  });
});

module.exports = app; // imported into server.js
