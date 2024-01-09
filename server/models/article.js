const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imagePath: { 
    type: String,
    required: true,
  },
  hospitalId: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital', 
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Department', 
  },
  views: {
    type: Number,
    default: 0, 
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;