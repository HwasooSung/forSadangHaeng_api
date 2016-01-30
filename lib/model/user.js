"use strict";

var mongoose = require('mongoose')
// , config = require('../../config/config')
  , Schema = mongoose.Schema
  ;

var UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  
  hashed_password: { type: String, required: true },
  verified: { type: Boolean, required: true },
  
  reset_token: { type: String, unique: true },
  reset_token_expires: Date,
  verify_token: { type: String, unique: true },
  verify_token_expires: Date,
  
  univID: { type: Schema.Types.Id, required: true },
  memberSince: { type: Date, default: Date.now() },
  
  reportCounts: { type: [Schema.Types.Id] }
});



mongoose.model('users', UserSchema);

var UserModel = mongoose.model('users');
module.exports = UserModel;