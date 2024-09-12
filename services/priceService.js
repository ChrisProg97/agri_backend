const db = require('../db'); // Make sure this points to your database connection

// Add a new price for crop
const addPrice = async (crop_id, market_id, price, quantity, added_by) => {

  try {
    const result = await db.one(
      'INSERT INTO prices (crop_id, market_id, price, quantity, added_by) VALUES ($1, $2, $3, $4, $5) RETURNING id, crop_id, market_id, price, quantity, added_by',
      [crop_id, market_id, price, quantity, added_by]
    );
    return result;
  } catch (error) {
    throw new Error(`Error adding price: ${error.message}`);
  }
};

// Add a new animal price
const addAnimalPrice = async (animal_id, market_id, price, quantity, added_by) => {

  try {
    const result = await db.one(
      'INSERT INTO animal_price (animal_id, market_id, price, quantity, added_by) VALUES ($1, $2, $3, $4, $5) RETURNING id, animal_id, market_id, price, quantity, added_by',
      [animal_id, market_id, price, quantity, added_by]
    );
    return result;
  } catch (error) {
    throw new Error(`Error adding animal price: ${error.message}`);
  }
};

// Getting crop name, market name and price
const getPricesWithDetails = async () => {
  try {
    const query = `
      SELECT 
        prices.id, 
        crops.name AS crop_name, 
        markets.name AS market_name,
        prices.quantity, 
        prices.price
      FROM prices
      JOIN crops ON prices.crop_id = crops.id
      JOIN markets ON prices.market_id = markets.id
    `;
    
    const pricesWithDetails = await db.any(query);
    return pricesWithDetails;
  } catch (error) {
    throw new Error(`Error retrieving prices with details: ${error.message}`);
  }
};

const getAnimalPrices = async (market_id) => {
  try {
    const query = `
      SELECT 
        animal_price.id, 
        animals.name AS animal_name, 
        markets.name AS market_name, 
        animal_price.price,
        animal_price.quantity
      FROM animal_price
      JOIN animals ON animal_price.animal_id = animals.id
      JOIN markets ON animal_price.market_id = markets.id
      WHERE animal_price.market_id = $1
    `;
    
    const animal_price = await db.any(query, [market_id]);
    return animal_price;
  } catch (error) {
    throw new Error(`Error retrieving animal prices: ${error.message}`);
  }
};


// Getting the details according to the market
const getPricesByMarket = async (market_id) => {
  try {
    const query = `
      SELECT 
        prices.id, 
        crops.name AS crop_name, 
        markets.name AS market_name,
        prices.quantity, 
        prices.price
      FROM prices
      JOIN crops ON prices.crop_id = crops.id
      JOIN markets ON prices.market_id = markets.id
      WHERE prices.market_id = $1
    `;
    
    const pricesWithDetails = await db.any(query, [market_id]);
    return pricesWithDetails;
  } catch (error) {
    throw new Error(`Error retrieving prices for market: ${error.message}`);
  }
};

// Get all prices
const getPrices = async () => {
  try {
    const prices = await db.any('SELECT * FROM prices');
    return prices;
  } catch (error) {
    throw new Error(`Error retrieving prices: ${error.message}`);
  }
};

// Update a price by ID
const updatePrice = async (id, crop_id, market_id, price) => {
  try {
    const result = await db.one(
      'UPDATE prices SET crop_id = $1, market_id = $2, price = $3 WHERE id = $4 RETURNING id, crop_id, market_id, price',
      [crop_id, market_id, price, id]
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating price: ${error.message}`);
  }
};

// Delete a price by ID
const deletePrice = async (id) => {
  try {
    const result = await db.result(
      'DELETE FROM prices WHERE id = $1',
      [id]
    );
    return result.rowCount > 0; // Return true if a row was deleted
  } catch (error) {
    throw new Error(`Error deleting price: ${error.message}`);
  }
};

module.exports = { addPrice, addAnimalPrice, getAnimalPrices, getPricesWithDetails, getPricesByMarket, getPrices, updatePrice, deletePrice };
