import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH update a user
router.patch('/:id', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;