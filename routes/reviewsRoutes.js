import express from 'express';
import Review from '../models/reviewModel.js';
import Destination from '../models/destinationModel.js';
import User from '../models/userModel.js';

const router = express.Router();

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('destinationId').populate('authorId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET reviews by destination ID
router.get('/destination/:destinationId', async (req, res) => {
  try {
    const reviews = await Review.find({ destinationId: req.params.destinationId }).populate('authorId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new review
router.post('/', async (req, res) => {
  const { destinationId, authorId, rating, comment } = req.body;
  try {
    const destination = await Destination.findById(destinationId);
    const user = await User.findById(authorId);

    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const review = new Review({ destinationId, authorId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH update an existing review
router.patch('/:id', async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment, updatedAt: Date.now() },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;