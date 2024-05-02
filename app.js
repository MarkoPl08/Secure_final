const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const authenticateToken = require('./routes/middlewares/validate_token');

const serialization = require('./routes/serialize');
const deserialization = require('./routes/deserialize');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self';");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.removeHeader("X-Powered-By");
  next();
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', authenticateToken, usersRouter);
app.use('/users', usersRouter);
app.use('/auth/register', registerRouter);
app.use('/auth', loginRouter);
app.use('/serialize', serialization);
app.use('/deserialize', deserialization);

// Protected Route Example
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
