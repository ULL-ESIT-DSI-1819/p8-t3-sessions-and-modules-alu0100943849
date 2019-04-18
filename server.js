const express = require('express');
const session = require('express-session');
const auth = require('./auth.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();


app.set('views', './src/server/views'); //Configuramos el directorio de vistas
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : false}));

app.use(session({
    secret: 'indecipherable-secret',
    resave: true,
    saveUninitialized: true,
}));

app.use('/', auth({
    passwordFile: path.join(__dirname, 'users.json'),
    pathToProtect: './dist',//path.join(__dirname, '../../../', 'dist'),
    registerView: 'register',
    successRegisterView: 'registerSuccess',
    errorRegisterView: 'registerError',
    loginView: 'login',
    successLoginView: 'loginSuccess',
    errorLoginView: 'loginError',
    logoutView: 'logout',
    unauthorizedView: 'unauthorizedView',
}));

app.get('/', (req, res) => {
    res.render('index');
})

server = app.listen(8000, '0.0.0.0', () => console.log("listening at http:localhost:8000"));
