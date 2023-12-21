const express = require("express");
const router = express.Router();
const multer = require("multer");
const Article = require("../models/article");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../client/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/create-article", upload.single("image"), async (req, res) => {
  try {
    const { title, content, hospitalId, departmentId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newArticle = new Article({
      title,
      content,
      imagePath,
      hospitalId,
      departmentId,
    });

    await newArticle.save();

    res.status(201).json({ message: "Article created successfully" });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Error creating article" });
  }
});

router.get("/", async (req, res) => {
  // Updated route for fetching all articles
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Error fetching articles" });
  }
});

router.get("/articles/:articleId", async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Error fetching article" });
  }
});

router.put("/articles/:articleId", async (req, res) => {
  try {
    const { title, content, hospitalId, departmentId } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.articleId,
      { title, content, hospitalId, departmentId },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Error updating article" });
  }
});

router.delete("/:articleId", async (req, res) => {
  // Updated route for deleting an article
  try {
    const deletedArticle = await Article.findByIdAndDelete(
      req.params.articleId
    );
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Error deleting article" });
  }
});

module.exports = router;
