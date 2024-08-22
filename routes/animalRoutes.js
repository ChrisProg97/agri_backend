const express = require('express');
const { addAnimal, updateAnimal, deleteAnimal, getAnimals } = require('../services/animalService');
const { addAnimalProductPrice, getAnimalPricesWithDetails, getAnimalByMarket, 
  getAnimalProductPrices, updateAnimalProductPrice,
  deleteAnimalProductPrice} = require('../services/productPiceService');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Add an Animal (authenticated)
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
    const animal = await getAnimals;
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Animal by ID (authenticated)
router.put('/edit/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, breed } = req.body;
  try {
    const updatedAnimal = await updateAnimal(id, name, breed);
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

// The code below is for CRUD operation for animal products
// Add an Animal product (authenticated)
router.post('/add/product', authMiddleware, async (req, res) => {
    const { name } = req.body;
    try {
      const result = await addProduct(name, req.user.id); // req.user.id from token
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all Animal products (public)
router.get('/get/products', async (req, res) => {
    try {
      const animal = await getProducts;
      res.status(200).json(animal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update a Animal Product by ID (authenticated)
router.put('/edit/product/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updatedProduct = await updateAnimal(id, name);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete a Animal product by ID (authenticated)
router.delete('/delete/product/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const isDeleted = await deleteProduct(id);
      if (isDeleted) {
        res.status(204).end(); // No content
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // The code below is for adding price to animal products
  // Add an Animal product (authenticated)
router.post('/add/product/price', authMiddleware, async (req, res) => {
  const { product_id, market_id, price } = req.body;
  try {
    const result = await addAnimalProductPrice(product_id, market_id, price, req.user.id); // req.user.id from token
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Animal products, prices and the market (public)
router.get('/get/products/price/:id', async (req, res) => {
  const { market_id } = req.params;
  try {
    const animalProductPrice = await getAnimalByMarket(market_id);
    res.status(200).json(animalProductPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Animal Product by ID (authenticated)
router.put('/edit/product/price/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { product_id, market_id, price } = req.body;
  try {
    const updateProductPrice = await updateAnimalProductPrice(id, product_id, market_id, price);
    res.status(200).json(updateProductPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Animal product by ID (authenticated)
router.delete('/delete/product/price/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await deleteAnimalProductPrice(id);
    if (isDeleted) {
      res.status(204).end(); // No content
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
