"use strict";

var mongoose = require('mongoose')
  // , uuid = require('uuid')
  // , config = require('../../config/config')
  , Schema = mongoose.Schema
  ;

var PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  
  author: { type: Schema.Types.ObjectId, required: true },
  university: { type: Schema.Types.ObjectId, required: true },
  
  written: { type: Date, default: Date.now() },
  edited: { type: Date, default: Date.now() },
  
  votes: { type: [{ uid: String, type: Number }] },
  comments: { type: [String] },
});

mongoose.model('posts', PostSchema);

var CommentModel = mongoose.model('posts');
module.exports = CommentModel;