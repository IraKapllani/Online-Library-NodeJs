const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'EJS');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const showRoutes = require('./routes/show');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

app.use((req, res, next) => {
    next();
});

app.use('/admin', adminRoutes);
app.use(showRoutes);

app.use(errorController.get404Page);


mongoConnect(() => {
  
    app.listen(3001);
});