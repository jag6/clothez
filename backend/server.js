const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
const uploadRouter = require('./routers/uploadRouter');

//set up mongoose
mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to mongodb');
}).catch((error) => {
    console.log(error.reason);
});


//set ejs for pages
app.set('view engine', 'ejs');

//configure express to show content
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//handle errors
app.use((err, req, res, next) => {
    const status = err.name && err.name == 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
});


//set up routers
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);

//index page
app.get('/', (req, res) => {
    res.render('store/index', {
        //metadata
        meta_title: 'Home',
        meta_description: 'Come and shop at the best online clothes shop around',
        meta_image: 'woman-sunglasses.webp',
        meta_url: '',
        //css
        css: '',
        //script
        script: ''
    });
});


//server
app.listen(config.PORT, () => {
    console.log(`listening on http://localhost:${config.PORT}`);
});