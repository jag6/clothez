const express = require('express');
const adminRouter = express.Router();


//GET PAGES

//admin dashboard
adminRouter.get('/dashboard', async (req, res) => {
    res.render('admin/dashboard', {
        //metadata
        meta_title: 'Admin Dashboard',
        meta_description: 'View and change your admin user information',
        meta_image: 'woman-sunglasses.webp',
        meta_url: '/users/admin',
        //css
        css: '<link rel="stylesheet" href="/css/dashboard.css">',
        //script
        script: '<script type="module" src="/scripts/admin/dashboard.js" defer></script>'
    });
});

//product-list
adminRouter.get('/product-list', async (req, res) => {
    res.render('admin/product-list', {
        //metadata
        meta_title: 'Product List'
    });
});

module.exports = adminRouter;