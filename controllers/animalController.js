// controllers/cropPriceController.js
const animalService = require('../services/animalService');
const productPriceService = require('../services/productPiceService');

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
    const animals = await animalService.getAnimals();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAnimal = async (req, res) => {
    const { id } = req.params;
    const { name, breed } = req.body;
    
    try {
      const updateAnimal = await animalService.updateAnimal(id, name, breed);
      res.status(200).json(updateAnimal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteAnimal = async (req, res) => {
    const { id } = req.params;
  
    try {
      const isDeleted = await animalService.deleteAnimal(id);
      if (isDeleted) {
        res.status(204).end(); // No content
      } else {
        res.status(404).json({ error: 'Animal not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const addProduct = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id; // assuming userId is added to req.user in authentication middleware
  
    try {
      const result = await animalService.addProduct(name, userId);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getProducts = async (req, res) => {
    try {
      const animals = await animalService.getProducts();
      res.status(200).json(animals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    try {
      const updateProduct = await animalService.updateProduct(id, name);
      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const isDeleted = await animalService.deleteProduct(id);
      if (isDeleted) {
        res.status(204).end(); // No content
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getAnimalByMarket = async (req, res) => {
    console.log("In controller");
    const { id } = req.params;
    
    try {
      const result = await productPriceService.getAnimalByMarket(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { 
    addAnimal, getAnimals, getProducts, addProduct, 
    deleteProduct, updateProduct, updateAnimal, deleteAnimal, getAnimalByMarket };
