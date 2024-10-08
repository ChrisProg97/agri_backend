const db = require('../db');

const addDriver = async (firstName, lastName, carType, phone1, phone2, marketId) => {
    try {
        const result = await db.query(
            `INSERT INTO driver (first_name, last_name, car_type, phone_1, phone_2, market_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, created_at, first_name, car_type, last_name, phone_1, phone_2, market_id`,
            [firstName, lastName, carType, phone1, phone2, marketId]
        );
        return result;
    } catch (error) {
        throw new Error(`Error adding driver: ${error.message}`);
    }
};

const getDrivers = async () => {
    try {
        const result = await db.query(`SELECT * FROM driver`);
        return result.rows;
    } catch (error) {
        throw new Error(`Error fetching drivers: ${error.message}`);
    }
};

const getDriverById = async (id) => {
    try {
        const result = await db.query(
            `SELECT * FROM driver WHERE id = $1`,
            [id]
        );
        if (result.rows.length === 0) {
            throw new Error('Driver not found');
        }
        return result;
    } catch (error) {
        throw new Error(`Error fetching driver: ${error.message}`);
    }
};

const updateDriver = async (id, firstName, lastName, carType, phone1, phone2, marketId) => {
    try {
        const result = await db.query(
            `UPDATE driver
            SET first_name = $1, last_name = $2, car_type = $3, phone_1 = $4, phone_2 = $5, market_id = $6
            WHERE id = $6
            RETURNING id, created_at, first_name, car_type, last_name, phone_1, phone_2, market_id`,
            [firstName, lastName, carType, phone1, phone2, marketId, id]
        );
        if (result.rows.length === 0) {
            throw new Error('Driver not found');
        }
        return result;
    } catch (error) {
        throw new Error(`Error updating driver: ${error.message}`);
    }
};

const deleteDriver = async (id) => {
    try {
        const result = await db.query(
            `DELETE FROM driver WHERE id = $1`,
            [id]
        );
        if (result.rowCount === 0) {
            throw new Error('Driver not found');
        }
        return true;
    } catch (error) {
        throw new Error(`Error deleting driver: ${error.message}`);
    }
};

const getDriversByMarketId = async (marketId) => {
    try {
        const result = await db.query(
            `SELECT * FROM driver WHERE market_id = $1`,
            [marketId]
        );
        return result;
    } catch (error) {
        throw new Error(`Error fetching drivers by market_id: ${error.message}`);
    }
};

module.exports = {
    addDriver,
    getDrivers,
    getDriverById,
    updateDriver,
    deleteDriver, 
    getDriversByMarketId
};
