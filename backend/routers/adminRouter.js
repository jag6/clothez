const express = require('express');
const { body, validationResult } = require('express-validator');
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
adminRouter.get('/product/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('admin/product-edit', {
        //metadata
        meta_title: 'Edit Product',
        //product
        product: product
    });
});


//POST

//create new product
adminRouter.post('/product-list', [
    //sanitize post data
    body('name').trim().escape(),
    body('description').trim().escape(),
    body('gender').trim().escape(),
    body('category').trim().escape(),
    body('type').trim().escape(),
    body('image_main').trim().escape(),
    body('image_1').trim().escape(),
    body('image_2').trim().escape(),
    body('image_3').trim().escape(),
    body('image_4').trim().escape(),
    body('price').trim().escape(),
    body('count_in_stock').trim().escape(),
], isAuth, isAdmin, async (req, res) => {
    //validate data
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return res.status(400).send({
            message: 'Please fill in the required fields'
        });
    }
    //save product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        gender: req.body.gender,
        category: req.body.category,
        type: req.body.type,
        image_main: req.body.image_main,
        image_1: req.body.image_1,
        image_2: req.body.image_2,
        image_3: req.body.image_3,
        image_4: req.body.image_4,
        price: req.body.price,
        count_in_stock: req.body.count_in_stock,
    });
    const createdProduct = await product.save();
    if(!createdProduct) {
        res.status(401).send({ message: 'Invalid data, please try again'});
    }else {
        res.status(201).send({
            _id: createdProduct._id,
            name: createdProduct.name,
            description: createdProduct.description,
            gender: createdProduct.gender,
            category: createdProduct.category,
            type: createdProduct.type,
            image_main: createdProduct.image_main,
            image_1: createdProduct.image_1,
            image_2: createdProduct.image_2,
            image_3: createdProduct.image_3,
            image_4: createdProduct.image_4,
            price: createdProduct.price,
            count_in_stock: createdProduct.count_in_stock,
        });
    }
});

module.exports = adminRouter;