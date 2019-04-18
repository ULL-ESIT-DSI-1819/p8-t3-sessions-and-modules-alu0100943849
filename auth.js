const fs = require('fs');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);


function authentication(options) {
    const {
        passwordFile,
        pathToProtect,
        registerView,
        successRegisterView,
        errorRegisterView,
        loginView,
        successLoginView,
        errorLoginView,
        logoutView,
        unauthorizedView,
      } = options;
  
    if (!fs.existsSync(passwordFile)) fs.writeFileSync(passwordFile, '{}');

    const auth = (req, res, next) => {
        if (req.session && req.session.username && req.session.password) return next();

        return res.status(401).render(unauthorizedView);
      };

    router.use('/content', auth, express.static(pathToProtect));

    
  
    router.get('/login', (req, res) => {
      if(!req.session.username) res.render(loginView);
      else res.render(successLoginView);
    });
  
    router.post('/login', (req, res) => {
        const passFile = fs.readFileSync(passwordFile);
        const passFileParsed = JSON.parse(passFile);
        const pass = passFileParsed[req.body.password];

        if(pass){
            if(req.session && req.body && req.body.password && bcrypt.compareSync(req.body.password, pass)){
                req.session.username = req.body.username;
                req.session.password = req.body.password;
                //req.session.admin = true;

                return res.render(successLoginView);
            }
            return res.render(errorLoginView);
        }
        return res.render(errorLoginView);
    });
  
    router.get('/register', (req, res) => {
        if(!req.session.username) res.render(registerView);
        else res.render(successLoginView);
    });
  
    router.post('/register', (req, res) => {
        const passFile = fs.readFileSync(passwordFile);
        const passFileParsed = JSON.parse(passFile);
        const pass = passFileParsed[req.body.password];

        if(!pass)
            passFileParsed[req.body.password] = bcrypt.hashSync(req.body.password, salt);
        else return res.render(errorRegisterView);

        const passFileJSON = JSON.stringify(passFileParsed);
        fs.writeFileSync(passwordFile, passFileJSON);

        return res.render(successRegisterView);
    });
  
    // Route to logout
    router.get('/logout', (req, res) => {
      req.session.destroy();
      res.render(logoutView);
    });

    return router;
  }
  
  module.exports = authentication;