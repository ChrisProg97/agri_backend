const express = require('express');
const driverService = require('../services/driverService'); 
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a driver (authenticated)
router.post('/add', authMiddleware, async (req, res) => {
    
    try {
        const newDriver = await driverService.addDriver(req, res);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all drivers (public)
router.get('/', async (req, res) => {
    try {
        const drivers = await driverService.getDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get driver by id
router.get('/:id', async (req, res) => {
    
    try {
        const driver = await driverService.getDriverById(req, res);
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update driver (authenticated)
router.put('/edit/:id', authMiddleware, async (req, res) => {

    try {
        const updatedDriver = await driverService.updateDriver(req, res);
        if (updatedDriver) {
            res.status(200).json(updatedDriver);
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete driver (authenticated)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    
    try {
        const isDeleted = await driverService.deleteDriver(req, res);
        if (isDeleted) {
            res.status(204).end(); // No content
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get drivers by market_id
router.get('/by-market/:marketId', async (req, res) => {
    try {
        const drivers = await driverController.getDriversByMarketId(req, res);
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
