//  imports 
const mongoose = require('mongoose');
// define mongodsb connection url
const mongoUrl = 'mongodb://localhost:27017/hotels';
// setup mongodb connection 
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on('connected', () => {
    console.log("MongoDB Server is connected"); 
})
db.on('error', (err) => {
    console.log("MongoDB Server connection error : ", err);
})
db.on('disconnected', () => {
    console.log("MongoDB Server is Disconnected");
})
// export the database 
module.exports = db;