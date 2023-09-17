var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ResponseImageSchema = new Schema({
  mimetype: { type: String, required: true },
  title: { type: String, required: true },
  categories: { type: String, required: true },
  img: {
    data: Buffer,
    contentType: String
  }
});

module.exports = ResponseImage = mongoose.model(
  'responseImage',
  ResponseImageSchema
);
