const express = require('express');
const { addAnimal, getAnimal, updateAnimal, deleteAnimal } = require('../services/animalService');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a Animal price (authenticated)
router.post('/add', authMiddleware, async (req, res) => {
  const { name, breed } = req.body;
  try {
    const result = await addAnimal(name, breed, req.user.id); // req.user.id from token
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Animals (public)
router.get('/', async (req, res) => {
  try {
    const Animals = await getAnimal();
    res.status(200).json(Animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Animal price by ID (authenticated)
router.put('/edit/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedAnimal = await updateAnimal(id, name, description);
    res.status(200).json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Animal price by ID (authenticated)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await deleteAnimal(id);
    if (isDeleted) {
      res.status(204).end(); // No content
    } else {
      res.status(404).json({ error: 'Animal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
