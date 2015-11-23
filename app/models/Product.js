//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//
//// create a schema
//var productSchema = new Schema({
//
//    "carrier": "AT&T",
//    name: { type: String, required: true, unique: true },
//    imageUrl: "img/phones/motorola-atrix-4g.0.jpg",
//    "name": "MOTOROLA ATRIX\u2122 4G",
//    "snippet": "MOTOROLA ATRIX 4G the world's m
//
//
//  name: String,
//  email: { type: String, required: true, unique: true },
//  password: { type: String, required: true },
//  admin: Boolean,
//  location: String,
//  meta: {
//    age: Number,
//    website: String
//  },
//  created_at: Date,
//  updated_at: Date
//});
//
//// on every save, add the date
//productSchema.pre('save', function(next) {
//  // get the current date
//  var currentDate = new Date();
//
//  // change the updated_at field to current date
//  this.updated_at = currentDate;
//
//  // if created_at doesn't exist, add to that field
//  if (!this.created_at)
//    this.created_at = currentDate;
//
//  next();
//});
//
//// the schema is useless so far
//// we need to create a model using it
//var Product = mongoose.model('Product', productSchema);
//
//// make this available to our users in our Node applications
//module.exports = Product;