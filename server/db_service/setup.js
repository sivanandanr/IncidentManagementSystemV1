const Project = require('../models/project.model');
const User = require('../models/user.model');
const mongoose = require("mongoose");

function attemptMongooseConnection(mongoDbHost, mongoDbPort, mongoDbName) {
  console.log("----------------------------------Host------------------------------------------------------:)");
  console.log(mongoDbHost);
  console.log("----------Host------------------------------------------------------------------------------:)");
  const url = `mongodb://${mongoDbHost}:${mongoDbPort}/${mongoDbName}`;
  console.log(url);
  // attempt to connect to running instance of mongodb with a database name of `db-name`
  mongoose.connect(url, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true }
    );


  // get the connection object for mongoose
  const db = mongoose.connection;

  // handler for a failed mongodb connection
  db.on("error", console.error.bind(console, "ERROR CONNECTING TO MONGODB!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));

  // handler for a successful mongodb connection
  db.once("open", function () {
    console.log("Mongoose is now connected to mongodb ----------------------------------------------------------------------------------------:)");
    console.log("import user data");
    if(!Project.find({name: 'Project 1'}))
    Project.create({
      // Inserting value of only one key
      name: "Project 1"
    })
    .then((ans) => {
      console.log(ans);
    })
    .catch((err) => {
      console.log(err.message);
    });
    if(!Project.find({name: 'Project 2'}))
    Project.create({
      // Inserting value of only one key
      name: "Project 2"
    })
    .then((ans) => {
      console.log(ans);
    })
    .catch((err) => {
      console.log(err.message);
    });
    if(!User.find({email: 'admin@inc.com'})){
      
    User.create({
      // Inserting value of only one key
      name: "administrator",
      password:'admin',
      email: 'admin@inc.com',
      role: 'Admin'
    })
    .then((ans) => {
      console.log(ans);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
  if(!User.find({email: 'user1@inc.com'}))
    User.create({
      // Inserting value of only one key
      name: "user1",
      password:'smiles',
      email: 'user1@inc.com',
      role: 'Developer'
    })
    .then((ans) => {
      console.log(ans);
    })
    .catch((err) => {
      console.log(err.message);
    });
    if(!User.find({email: 'user2@inc.com'}))
    User.create({
      // Inserting value of only one key
      name: "user2",
      password:'smiles',
      email: 'user2@inc.com',
      role: 'Developer'
    })
    .then((ans) => {
      console.log(ans);
    })
    .catch((err) => {
      console.log(err.message);
    });
  });
 
  
}


module.exports = attemptMongooseConnection;
