const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const Article = require('../models/article');

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST endpoint to create a new article
router.post('/create-article', upload.single('image'), async (req, res) => {
  try {
    // Extract article data from the request body
    const { title, content, hospitalId, departmentId } = req.body;

    // Handle file upload - req.file contains the uploaded image
    const image = req.file.buffer; // Assuming the image is stored as a Buffer

    // Create a new article instance
    const newArticle = new Article({
      title,
      content,
      image,
      hospitalId,
      departmentId,
    });

    // Save the new article to the database
    await newArticle.save();

    res.status(201).json({ message: 'Article created successfully' });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Error creating article' });
  }
});

// GET endpoint to fetch all articles
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Error fetching articles' });
  }
});

// GET endpoint to fetch a specific article by ID
router.get('/articles/:articleId', async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Error fetching article' });
  }
});

// PUT endpoint to update a specific article by ID
router.put('/articles/:articleId', async (req, res) => {
  try {
    const { title, content, hospitalId, departmentId } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.articleId,
      { title, content, hospitalId, departmentId },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Error updating article' });
  }
});

// DELETE endpoint to delete a specific article by ID
router.delete('/articles/:articleId', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.articleId);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Error deleting article' });
  }
});

module.exports = router;
