import express from 'express';
import Destination from '../models/destinationModel.js';

const router = express.Router();

// GET all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new destination
router.post('/', async (req, res) => {
  const { name, location, description, imageUrl } = req.body;
  try {
    const destination = new Destination({ name, location, description, imageUrl });
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH update destination
router.patch('/:id', async (req, res) => {
  const { name, location, description, imageUrl } = req.body;
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      { name, location, description, imageUrl },
      { new: true }
    );
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE destination
router.delete('/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;