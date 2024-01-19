const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const { campgroundSchema } = require('../Schemas');
const campgrounds = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campground = require('../models/campground');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    // index page
    .get(catchAsync(campgrounds.index))
    // post new campsite
    .post(isLoggedIn,  upload.array('campground[images]'),validateCampground, catchAsync(campgrounds.createCampground))
    // .post(upload.array('image'),(req,res)=>{
    //     console.log( req.files)
    //     res.send('IT WORKED!');
    // })

// new page
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    // show page
    .get(catchAsync(campgrounds.showCampground))
    // updating a campspot
    .put(isLoggedIn, isAuthor, upload.array('campground[images]'), validateCampground, catchAsync(campgrounds.updateCampground))
    // delete a campspot
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

// get a campspot to update it
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;