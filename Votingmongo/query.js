

const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); // To the database

const queries = [

  Voters.find().where('zipcode').equals(13617).countDocuments(),
  Voters.find().where('first').equals('STARR'),
  Voters.find({'history':{$regex:/GE16/}}),
  Voters.find().sort('-last').limit(1),
  Voters.distinct('zipcode')

];

// Run the queries in parallel
Promise.all(queries)
  .then(function(result) {
    console.log('How many registered voters live in the Canton zipcode? ', result[0]);
    console.log('What are the full names of all registered voters whose first name is STARR?', result[1].map(i => i.first +"-" +i.last));
    console.log('How many people voted in the 2016 general election (GE16)?', result[2].length)
    console.log('What is the last-name that comes last in the county in alphabetical order?', result[3].map(i => i.last))
    console.log('How many zip codes does the county contain?', result[4].length)
}).catch(error => console.error(error.stack));
