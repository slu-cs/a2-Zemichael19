

const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); // To the database

const queries = [
  Voters.find();

  Voters.find().sort('name'),


  Voters.find().sort('-started').limit(1),


  Voters.find().where('started').equals(2003),


  Voters.find().where('courses').in(362),

  Voters.distinct('rank')
];


// Run the queries in parallel
Promise.all(queries)
  .then(function(result) {
    console.log('How many registered voters live in the Canton zipcode? ', result[0].map(p => p.first));
}).catch(error => console.error(error.stack));
