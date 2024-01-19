// importing all dependencies
const mongoose = require('mongoose')
const Campground = require('../models/campground');
const cities = require('./cities')

// setting up local mongoose connection
mongoose.connect('mongodb://localhost:27017/findMyCampSpot');
const {places,descriptors} = require('./seedHelpers')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error : "));
db.once("open", ()=>{
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() =>{
    await Campground.deleteMany({})
    for(let i=0;i<50;i++){
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            title : `${sample(descriptors)} ${sample(places)}`,
            location : `${cities[rand1000].city}, ${cities[rand1000].state}`,
            author: '65a7d7c4e372dd3038e5c1d7',
            price: price,
            description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, dolore ex. Et iure dolor modi est debitis. Deleniti commodi necessitatibus aspernatur doloribus ex! Aperiam ut eum corporis voluptatem distinctio at.',
            images: [
                {
                  url: 'https://res.cloudinary.com/do5yh3ptz/image/upload/v1705669158/CampSpot/dabgzgq6zmps8cfjgvir.jpg',
                  filename: 'CampSpot/dabgzgq6zmps8cfjgvir',
                },
                {
                  url: 'https://res.cloudinary.com/do5yh3ptz/image/upload/v1705669153/CampSpot/flks6ydhnygnsntzmfxc.jpg',
                  filename: 'CampSpot/flks6ydhnygnsntzmfxc',
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})

