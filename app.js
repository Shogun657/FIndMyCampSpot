// initializing dotenv 
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

// importing all dependencies
const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')
const ejsMate = require('ejs-mate');
const path = require('path')
const app = express();
const flash = require('connect-flash');
const userRoutes = require('./routes/users')
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');



// setting up local mongoose connection
mongoose.connect('mongodb://localhost:27017/findMyCampSpot');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error : "));
db.once("open", () => {
    console.log("Database connected")
});

// setting up ejs and other middlewares
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))     // to parse json
app.use(methodOverride('_method')); // to use put and delete methods on our forms
app.use(express.static(path.join(__dirname,'public')))


// initialising session and defining its properties
const sessionConfig = {
    secret : 'Thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7

    }
} 

// adding flash and session
app.use(session(sessionConfig));
app.use(flash());

// addding passport authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
// serialization
passport.serializeUser(User.serializeUser());   // how to store user in a session 
passport.deserializeUser(User.deserializeUser());   // how to log user out of a session

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    next();
})

// setting up the middleware of our routers to work

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);


// The validators below have been moved to their own separate routes

// // middleware to validate our campground information on the server side
// const validateCampground = (req, res, next) => {
//     // Basic error we have defined ourselves
//     // if(!req.body.campground) throw new ExpressError('Invalid CampSpot Data!', 400);

//     // We will now create a new Schema to validate our entries
//     // This is not mongoose schema, this is joi schema

//     // const campgroundSchema = Joi.object({
//     //     campground : Joi.object({
//     //         title : Joi.string().required(),
//     //         price : Joi.number().required().min(0),
//     //         image: Joi.string().required(),
//     //         location : Joi.string().required(),
//     //         description : Joi.string().required
//     //     }).required()
//     // })
//     const { error } = campgroundSchema.validate(req.body)

//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400);
//     } else {
//         next();
//     }
// }

// const validateReview = (req,res,next) => {
//     const {error} = reviewSchema.validate(req.body)

//     if(error) { 
//         const msg = error.details.map(el=>el.message).join(',')
//         throw new ExpressError(msg, 400);
//     } else {
//         next();
//     }
// }

// home route
app.get('/', (req, res) => {
    res.render('home')
})

// Setting 404 error
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

// default error handling route
app.use((err, req, res, next) => {
    const { status = 500 } = err
    if (!err.message) err.message = "Something went wrong"
    res.status(status).render('error', { err })
})


app.listen(5000, () => {
    console.log("Server is up and running at port 5000")
})
