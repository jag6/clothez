const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel');
const config = require('../config');
const { generateToken, isAuth, isAdmin } = require('../utils');


//API

//create admin user
userRouter.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            first_name: config.ADMIN_FN,
            last_name: config.ADMIN_LN,
            email: config.ADMIN_E,
            password: config.ADMIN_PW,
            isAdmin: true
        });
        const createdUser = await user.save();
        res.send(createdUser);
    }catch(err) {
        res.status(500).send({ message: err.message });
    }
});


//GET PAGES

//login
userRouter.get('/login', (req, res) => {
    res.render('users/login', {
        //metadata
        meta_title: 'Login',
        meta_description: 'Log in to your account',
        meta_image: 'woman-sunglasses.jpg',
        meta_url: '/users/login',
        //script
        script: '<script type="module" src="/scripts/users/login.js" defer></script>'
    });
});

//register
userRouter.get('/register', (req, res) => {
    res.render('users/register', {
         //metadata
         meta_title: 'Register',
         meta_description: 'Register your account',
         meta_image: 'woman-sunglasses.jpg',
         meta_url: '/users/register',
         //script
         script: '<script type="module" src="/scripts/users/register.js" defer></script>'
    });
});

module.exports = userRouter;