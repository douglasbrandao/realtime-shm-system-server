const mongoose = require('mongoose');
const uri = process.env.URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.set('useFindAndModify', false);

module.exports = mongoose;