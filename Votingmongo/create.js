

const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});



const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); // To the database

const result = [];
file.on('line', function(line) {
  const columns = line.split(',');
  result.push(
    new Voters ({
    first: columns[0],
    last: columns[1],
    zipcode: Number(columns[2]),
    history: columns[3]
    })
  )
});

  mongoose.connection.dropDatabase(function() {
    result.save(function(error) {
      if (error) console.error(error.stack);
        mongoose.connection.close(function() {
          console.log('Database is ready.');
        });
    });
});


/* mongoose.connection.dropDatabase()
  .then(() => result.save())
  .then(() => mongoose.connection.close())
  .then(()=> console.log("Ready"))
  .catch(error => console.error(error.stack)); */
