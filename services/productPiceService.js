const db = require('../db');

// Code for crop products prices

// Add a new price for crop product
const addCropProductPrice = async (product_id, market_id, price, added_by) => {
  try {
    const result = await db.one(
      'INSERT INTO crop_product_prices (product_id, market_id, price, added_by) VALUES ($1, $2, $3, $4) RETURNING id, product_id, market_id, price, added_by',
      [product_id, market_id, price, added_by]
    );
    return result;
  } catch (error) {
    throw new Error(`Error adding crop product price: ${error.message}`);
  }
};

// Getting product crop name, market name, and price
const getCropProductPricesWithDetails = async () => {
  try {
    const query = `
      SELECT 
        prices.id, 
        crop_products.name AS product_name, 
        markets.name AS market_name, 
        prices.price
      FROM crop_product_prices prices
      JOIN crop_products ON prices.product_id = crop_products.id
      JOIN markets ON prices.market_id = markets.id
    `;
    
    const pricesWithDetails = await db.any(query);
    return pricesWithDetails;
  } catch (error) {
    throw new Error(`Error retrieving crop product prices with details: ${error.message}`);
  }
};

// Getting the details according to the market
const getCropProductPricesByMarket = async (market_id) => {
  try {
    const query = `
      SELECT 
        prices.id, 
        crop_products.name AS product_name, 
        markets.name AS market_name, 
        prices.price
      FROM crop_product_prices prices
      JOIN crop_products ON prices.product_id = crop_products.id
      JOIN markets ON prices.market_id = markets.id
      WHERE prices.market_id = $1
    `;
    
    const pricesWithDetails = await db.any(query, [market_id]);
    return pricesWithDetails;
  } catch (error) {
    throw new Error(`Error retrieving crop product prices for market: ${error.message}`);
  }
};

// Get all prices
const getCropProductPrices = async () => {
  try {
    const prices = await db.any('SELECT * FROM crop_product_prices');
    return prices;
  } catch (error) {
    throw new Error(`Error retrieving crop product prices: ${error.message}`);
  }
};

// Update a price by ID
const updateCropProductPrice = async (id, product_id, market_id, price) => {
  try {
    const result = await db.one(
      'UPDATE crop_product_prices SET product_id = $1, market_id = $2, price = $3 WHERE id = $4 RETURNING id, product_id, market_id, price',
      [product_id, market_id, price, id]
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating crop product price: ${error.message}`);
  }
};

// Delete a price by ID
const deleteCropProductPrice = async (id) => {
  try {
    const result = await db.result(
      'DELETE FROM crop_product_prices WHERE id = $1',
      [id]
    );
    return result.rowCount > 0; // Return true if a row was deleted
  } catch (error) {
    throw new Error(`Error deleting crop product price: ${error.message}`);
  }
};



 // Code for animal products prices
// Add a new price for animal product
const addAnimalProductPrice = async (product_id, market_id, price, added_by) => {
  try {
    const result = await db.one(
      'INSERT INTO animal_product_prices (product_id, market_id, price, added_by) VALUES ($1, $2, $3, $4) RETURNING id, product_id, market_id, price, added_by',
      [product_id, market_id, price, added_by]
    );
    return result;
  } catch (error) {
    throw new Error(`Error adding animal product price: ${error.message}`);
  }
};

// Getting product animal product name, market name, and price
const getAnimalPricesWithDetails = async () => {
  try {
    const query = `
      SELECT 
        prices.id, 
        animal_products.name AS product_name, 
        markets.name AS market_name, 
        prices.price
      FROM animal_product_prices prices
      JOIN animal_products ON prices.product_id = animal_products.id
      JOIN markets ON prices.market_id = markets.id
    `;
    
    const pricesWithDetails = await db.any(query);
    return pricesWithDetails;
  } catch (error) {
    throw new Error(`Error retrieving animal product prices with details: ${error.message}`);
  }
};

// Getting the details according to the market and Animal Product Prices
const getAnimalByMarket = async (market_id) => {
  try {
    const query = `
      SELECT 
        prices.id, 
        animal_products.name AS product_name, 
        markets.name AS market_name, 
        prices.price
      FROM animal_product_prices prices
      JOIN animal_products ON prices.product_id = animal_products.id
      JOIN markets ON prices.market_id = markets.id
      WHERE prices.market_id = $1
    `;
    
    const pricesWithDetails = await db.any(query, [market_id]);
    return pricesWithDetails;
  } catch (error) {
    throw new Error(`Error retrieving animal product prices for market: ${error.message}`);
  }
};

// Get all prices
const getAnimalProductPrices = async () => {
  try {
    const prices = await db.any('SELECT * FROM animal_product_prices');
    return prices;
  } catch (error) {
    throw new Error(`Error retrieving animal product prices: ${error.message}`);
  }
};

// Update a price by ID
const updateAnimalProductPrice = async (id, product_id, market_id, price) => {
  try {
    const result = await db.one(
      'UPDATE animal_product_prices SET product_id = $1, market_id = $2, price = $3 WHERE id = $4 RETURNING id, product_id, market_id, price',
      [product_id, market_id, price, id]
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating animal product price: ${error.message}`);
  }
};

// Delete a price by ID
const deleteAnimalProductPrice = async (id) => {
  try {
    const result = await db.result(
      'DELETE FROM animal_product_prices WHERE id = $1',
      [id]
    );
    return result.rowCount > 0; // Return true if a row was deleted
  } catch (error) {
    throw new Error(`Error deleting animal product price: ${error.message}`);
  }
};


  module.exports = {
    addCropProductPrice, getCropProductPricesWithDetails, getCropProductPricesByMarket,
    getCropProductPrices, updateCropProductPrice, deleteCropProductPrice, addAnimalProductPrice,
    getAnimalPricesWithDetails, getAnimalByMarket, getAnimalProductPrices, updateAnimalProductPrice,
    deleteAnimalProductPrice
  }; 