const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
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

// const csrfProtection = csrf();
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

app.use(cors());   

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


const adminRoutes = require('./routes/admin');
const showRoutes = require('./routes/show');
const authRoutes = require('./routes/auth');



app.use(adminRoutes);
app.use(showRoutes);
app.use(authRoutes);

// app.get('/500', errorController.get500Page);
// app.use(errorController.get404Page);

mongoose.connect(MONGODB_URI).then(result => { 
        app.listen(3001);
    })
    .catch(err => {
        console.log(err);
    });