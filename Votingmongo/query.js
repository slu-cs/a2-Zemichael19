

const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); // To the database

const queries = [
  // What are names in alphabetical order?
  Voters.find().where('zipcode').equals('13617').count()

  /* Who started most recently?
  Professor.find().sort('-started').limit(1),

  // Who started in 2003?
  Professor.find().where('started').equals(2003),

  // Who teaches 362?
  Professor.find().where('courses').in(362),

  // What are all the ranks?
  Professor.distinct('rank')

  */
];


// Run the queries in parallel
Promise.all(queries)
  .then(function(result) {
    console.log('How many registered voters live in the Canton zipcode? ', result[0]);
}).catch(error => console.error(error.stack));
