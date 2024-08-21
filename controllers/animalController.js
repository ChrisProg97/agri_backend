// controllers/cropPriceController.js
const cropService = require('../services/animalService');

const addAnimal = async (req, res) => {
  const { name, breed } = req.body;
  const userId = req.user.id; // assuming userId is added to req.user in authentication middleware

  try {
    const result = await animalService.addAnimal(name, breed, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnimals = async (req, res) => {
  try {
    const crops = await animalService.getAnimals();
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addAnimal, getAnimals };
