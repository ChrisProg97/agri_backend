const driverService = require('../services/driverService');

exports.addDriver = async (req, res) => {
    const { firstName, lastName, carType, phone1, phone2, marketId } = req.body;
    try {
        const newDriver = await driverService.addDriver(firstName, lastName, carType, phone1, phone2, marketId);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDrivers = async (req, res) => {
    try {
        const drivers = await driverService.getDrivers();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDriverById = async (req, res) => {
    const { id } = req.params;
    try {
        const driver = await driverService.getDriverById(id);
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDriver = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, carType, phone1, phone2, marketId } = req.body;
    try {
        const updatedDriver = await driverService.updateDriver(id, firstName, lastName, carType, phone1, phone2, marketId);
        if (updatedDriver) {
            res.status(200).json(updatedDriver);
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteDriver = async (req, res) => {
    const { id } = req.params;
    try {
        const isDeleted = await driverService.deleteDriver(id);
        if (isDeleted) {
            res.status(204).end(); // No content
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDriversByMarketId = async (req, res) => {
    const { marketId } = req.params;
    try {
        const drivers = await driverService.getDriversByMarketId(marketId);
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};