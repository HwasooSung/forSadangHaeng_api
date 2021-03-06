"use strict";

var mongoose = require('mongoose')
  // , config = require('../../config/config')
  , Schema = mongoose.Schema
  ;

var CommentSchema = new Schema({
  // 댓글 내용
  text: { type: String, required: true },
  // 댓글 글쓴이
  author: { type: Schema.Types.ObjectId, required: true },
  // 댓글이 달린 게시물(post)의 ID
  postID: { type: Schema.Types.ObjectId, required: true },
  // 댓글 달린 날짜
  written: { type: Date, default: Date.now() },
  // 댓글이 수정된 날짜
  edited: { type: Date, default: Date.now() },
  // 댓글이 받은 좋아요 수
  votes: { type: [{ uid: Schema.Types.ObjectId, type: String }] },
  // 댓글이 신고된 수
  reported : { type: [{ uid: Schema.Types.ObjectId, type: String }] }
});

mongoose.model('comments', CommentSchema);

var CommentModel = mongoose.model('comments');
module.exports = CommentModel;