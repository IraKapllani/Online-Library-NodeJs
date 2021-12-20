const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
        errorMessage: message,
        oldInput: {email: '', password: ''},
        validationErrors: []
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
        errorMessage: message,
        oldInput: {email: '', password: '', confirmPassword: ''}
    });
};

// exports.postLogin = (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     let loadedUser;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).render('auth/login', {
//         path: '/login',
//         pageTitle: 'Login',
//         errorMessage: errors.array()[0].msg,
//         oldInput: {email: email, password: password}, 
//         validationErrors: errors.array()
//       });
//     }
//     User.findOne({ email: email })
//       .then(user => {
//         if (!user) {
//          const error = new Error('User could not be found');
//          error.statusCode = 401;
//          throw error;
//         }
//         loadedUser = user;
//         return bcrypt
//           .compare(password, user.password)
//           .then(doMatch => {
//             if (doMatch) {
//               req.session.isLoggedIn = true;
//               req.session.user = user;
//               return req.session.save(err => {
//                 console.log(err);
//                 res.redirect('/');
//               });
//             }
//             return res.status(422).render('auth/login', {
//                 path: '/login',
//                 pageTitle: 'Login',
//                 errorMessage: 'Invalid email or password!',
//                 oldInput: {email: email, password: password}, 
//                 validationErrors: []
//               });
//           })
//           .catch(err => {
//             console.log(err);
//             res.redirect('/login');
//           });
//       })
//       .catch(err => console.log(err));
//   };



  exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          const error = new Error('A user with this email could not be found.');
          error.statusCode = 401;
          throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
      })
      .then(isEqual => {
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
          },
          'somesupersecretsecret',
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  



exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            isAuthenticated: false,
            errorMessage: errors.array()[0].msg,
            oldInput: {email: email, password: password, confirmPassword: confirmPasswordv}
        });
    }
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: {
                    items: []
                }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};