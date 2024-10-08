const express = require('express');
const { addCrop, getCrops, updateCrop, deleteCrop, addProduct, 
  getProducts, deleteProduct } = require('../services/cropService');
const { addCropProductPrice, getCropPricesWithDetails, getCropProductPricesByMarket, 
    getCropProductPrices, updateCropProductPrice,
    deleteCropProductPrice} = require('../services/productPiceService');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a crop price (authenticated)
router.post('/add', authMiddleware, async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await addCrop(name, description, req.user.id); // req.user.id from token
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all crops (public)
router.get('/', async (req, res) => {
  try {
    const crops = await getCrops();
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a crop price by ID (authenticated)
router.put('/edit/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCrop = await updateCrop(id, name, description);
    res.status(200).json(updatedCrop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a crop price by ID (authenticated)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await deleteCrop(id);
    if (isDeleted) {
      res.status(204).end(); // No content
    } else {
      res.status(404).json({ error: 'Crop not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// The code below is for CRUD operation for Crop products
// Add an Crop product (authenticated)
router.post('/add/product', authMiddleware, async (req, res) => {
  const { product_name } = req.body;
  try {
    const result = await addProduct(product_name, req.user.id); // req.user.id from token
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Crop products (public)
router.get('/get/products', async (req, res) => {
  try {
    const crop = await getProducts();
    res.status(200).json(crop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Crop Product by ID (authenticated)
router.put('/edit/product/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedProduct = await updateCrop(id, name);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Crop product by ID (authenticated)
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

// The code below is for adding price to crop products
  // Add an crop product (authenticated)
  router.post('/add/product/price', authMiddleware, async (req, res) => {
    const { product_id, market_id, price } = req.body;
    try {
      const result = await addCropProductPrice(product_id, market_id, price, req.user.id); // req.user.id from token
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all crop products, prices and the market (public)
  router.get('/get/products/price/:market_id', async (req, res) => {
    const { market_id } = req.params;
    try {
      const cropProductPrice = await getCropProductPricesByMarket(market_id);
      res.status(200).json(cropProductPrice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a crop Product by ID (authenticated)
  router.put('/edit/product/price/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { product_id, market_id, price } = req.body;
    try {
      const updateProductPrice = await updateCropProductPrice(id, product_id, market_id, price);
      res.status(200).json(updateProductPrice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a crop product by ID (authenticated)
  router.delete('/delete/product/price/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const isDeleted = await deleteCropProductPrice(id);
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
