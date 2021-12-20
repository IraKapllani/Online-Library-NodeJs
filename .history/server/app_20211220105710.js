const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const User = require('./models/user');
const multer = require('multer');


const MONGODB_URI = 'mongodb+srv://ira:password1234@cluster0.trwjx.mongodb.net/library';

const app = express();
const store = new MongoDBStore({
      uri: MONGODB_URI,
      collection: 'sessions'
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

const csrfProtection = csrf();
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

app.set('view engine', 'EJS');
app.set('views', 'views');


app.use(bodyParser.json()); 
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter}).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));





app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
          if(!user){
              return next();
          }
        req.user = user;
        next();
      })
      .catch(err => { throw new Error(err)});
  });

  app.use(csrfProtection);
  app.use(flash());

  app.use((req, res, next)=> {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});


const adminRoutes = require('./routes/admin');
const showRoutes = require('./routes/show');
const authRoutes = require('./routes/auth');



app.use('/admin', adminRoutes);
app.use(showRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500Page);
app.use(errorController.get404Page);

mongoose.connect(MONGODB_URI).then(result => { 
        app.listen(3001);
    })
    .catch(err => {
        console.log(err);
    });