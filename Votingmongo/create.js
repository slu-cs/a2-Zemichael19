

const fs = require('fs');
const readline = require('readline');




const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); // To the database

const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});

const result = [];
file.on('line', function(line) {
  const columns = line.split(',');
  result.push(
    new Voters ({
    first: columns[0],
    last: columns[1],
    zipcode: columns[2],
    history: columns.slice(3)
    })
  )
});

file.on('close', function() {
  mongoose.connection.dropDatabase()
    .then(() => Promise.all(result.map(x => x.save())))
    .then(() => mongoose.connection.close())
    .then(()=> console.log("Ready"))
    .catch(error => console.log(error.stack));
})
