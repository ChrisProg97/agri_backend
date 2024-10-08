const db = require('../db'); // Make sure this points to your database connection

// Add a new crop
const addCrop = async (name, description, added_by) => {
  try {
    const result = await db.one(
      'INSERT INTO crops(name, description, added_by) VALUES($1, $2, $3) RETURNING id, name, description, added_by',
      [name, description, added_by]
    );
    return result;
  } catch (error) {
    throw new Error(`Error adding crop: ${error.message}`);
  }
};

// Get all crop
const getCrops = async () => {
  try {
    const crops = await db.any('SELECT * FROM crops');
    return crops;
  } catch (error) {
    throw new Error(`Error retrieving crop: ${error.message}`);
  }
};

// Update a crop by ID
const updateCrop = async (id, name, description) => {
  try {
    const result = await db.one(
      'UPDATE crops SET name = $1, description = $2 WHERE id = $3 RETURNING id, name, description',
      [name, description, id]
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating crop: ${error.message}`);
  }
};

// Delete a crop by ID
const deleteCrop = async (id) => {
  try {
    const result = await db.result(
      'DELETE FROM crops WHERE id = $1',
      [id]
    );
    return result.rowCount > 0; // Return true if a row was deleted
  } catch (error) {
    throw new Error(`Error deleting crop: ${error.message}`);
  }
};

// The code below is for crop products CRUD
// Add a new Crop product
const addProduct = async (name, added_by) => {
  try {
    const result = await db.one(
      'INSERT INTO crop_products(name, added_by) VALUES($1, $2) RETURNING id, name, added_by',
      [name, added_by]
    );
    return result;
  } catch (error) {
    throw new Error(`Error adding Crop Product: ${error.message}`);
  }
};

// Get all crop
const getProducts = async () => {
  try {
    const crops = await db.any('SELECT * FROM crop_products');
    return crops;
  } catch (error) {
    throw new Error(`Error retrieving Crop Product: ${error.message}`);
  }
};

// Update a crop product by ID
const updateProduct = async (id, name) => {
  try {
    const result = await db.one(
      'UPDATE crop_products SET name = $1 WHERE id = $2 RETURNING id, name',
      [name, id]
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating Crop Product: ${error.message}`);
  }
};

// Delete a crop product by ID
const deleteProduct = async (id) => {
  try {
    const result = await db.result(
      'DELETE FROM crop_products WHERE id = $1',
      [id]
    );
    return result.rowCount > 0; // Return true if a row was deleted
  } catch (error) {
    throw new Error(`Error deleting Crop Product: ${error.message}`);
  }
};

module.exports = { addCrop, getCrops, updateCrop, deleteCrop, 
  getProducts, addProduct, updateProduct, deleteProduct };
