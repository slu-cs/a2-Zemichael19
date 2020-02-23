

const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); // To the database

const queries = [

  Voters.find().where('zipcode').equals('13617').count(),
  Voters.find().where('first').equals('STARR'),


];

// Run the queries in parallel
Promise.all(queries)
  .then(function(result) {
    console.log('How many registered voters live in the Canton zipcode? ', result[0]);
    console.log('What are the full names of all registered voters whose full name is STARR?', result[1].map(x => x.first +"-" +x.last));
}).catch(error => console.error(error.stack));
