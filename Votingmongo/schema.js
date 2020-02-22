//define a plan for a collection

const mongoose = require('mongoose');

//schema for a collection of voters
const Voters = new mongoose.Schema({
  first: String,
  last: String,
  zipcode: Number,
  history: [String]

})
// speed up queries on all fields
Voters.index({first:1});
Voters.index({last:1});
Voters.index({zipcode:1});
Voters.index({history:1});

//compile and export this schema
module.exports = mongoose.model('Voter', Voters);
