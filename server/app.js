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


app.use('/admin', adminRoutes);
app.use(showRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});
});


app.listen(3000);