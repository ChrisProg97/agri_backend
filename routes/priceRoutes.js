const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');
const animalController = require('../controllers/animalController');
const authMiddleware = require('../middlewares/authMiddleware');

// Add a crop price (authenticated)
router.post('/add', authMiddleware, async (req, res) => {

    try {
        const result = await priceController.addPrice(req, res ); // Delegate to controller
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a animal price (authenticated)
router.post('/add/animal', authMiddleware, async (req, res) => {

    try {
        const result = await priceController.addAnimalPrice(req, res ); // Delegate to controller
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all prices (public)
router.get('/', async (req, res) => {
    try {
        const prices = await priceController.getPrices(req, res); // Delegate to controller
        res.status(200).json(prices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get crop name, market name and price
router.get('/details', async (req, res) => {
    await priceController.getPricesWithDetails(req, res);
  });

// Get animal name, market name and price
router.get('/animal/:market_id', async (req, res) => {
    await priceController.getAnimalPrices(req, res);
});

//   Getting details according to market
router.get('/market/:market_id', async (req, res) => {
    await priceController.getPricesByMarket(req, res);
  });
  

// Update a price by ID (authenticated)
router.put('/edit/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { crop_id, market_id, price } = req.body;
    try {
        const updatedPrice = await priceController.updatePrice(req, res); // Delegate to controller
        res.status(200).json(updatedPrice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a price by ID (authenticated)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const isDeleted = await priceController.deletePrice(req, res); // Delegate to controller
        if (isDeleted) {
            res.status(204).end(); // No content
        } else {
            res.status(404).json({ error: 'Price not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
