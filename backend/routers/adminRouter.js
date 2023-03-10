const express = require('express');
const adminRouter = express.Router();
const Product = require('../models/productModel');
const { isAuth, isAdmin } = require('../utils');

//GET PAGES

//admin dashboard
adminRouter.get('/dashboard', async (req, res) => {
    res.render('admin/dashboard', {
        //metadata
        meta_title: 'Admin Dashboard',
        meta_description: 'View and change your admin user information',
        meta_image: 'woman-sunglasses.webp',
        meta_url: '/users/admin'
    });
});

//product-list
adminRouter.get('/product-list', async (req, res) => {
    const products = await Product.find().sort({ createdAt: 'descending' });
    res.render('admin/product-list', {
        //metadata
        meta_title: 'Product List',
        //products
        products: products
    });
});

//product-edit
adminRouter.get('/product/edit:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('admin/product-edit', {
        //metadata
        meta_title: 'Edit Product',
        //product
        product: product
    })
});


//POST


module.exports = adminRouter;