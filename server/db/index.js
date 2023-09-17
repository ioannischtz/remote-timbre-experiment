const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://Giannis:KokkinoPrasinoMple@cluster0.tjuzl.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
