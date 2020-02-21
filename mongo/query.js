// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); // To the database

const queries = [
  Voters.find()
];


// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('How many registered voters live in the Canton zipcode? ', results[0].map(p => p.first));
}).catch(error => console.error(error.stack));
