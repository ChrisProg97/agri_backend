const db = require('../db'); // Make sure this points to your database connection

// Add a new Animal price
const addAnimal = async (name, breed, added_by) => {
  try {
    const result = await db.one(
      'INSERT INTO animals(name, breed, added_by) VALUES($1, $2, $3) RETURNING id, name, breed, added_by',
      [name, breed, added_by]
    );
    return result;
  } catch (error) {
    throw new Error(`Error adding Animal: ${error.message}`);
  }
};

// Get all Animal prices
const getAnimals = async () => {
  try {
    const animals = await db.any('SELECT * FROM animals');
    return animals;
  } catch (error) {
    throw new Error(`Error retrieving Animal: ${error.message}`);
  }
};

// Update a Animal price by ID
const updateAnimal = async (id, name, breed) => {
  try {
    const result = await db.one(
      'UPDATE animals SET name = $1, breed = $2 WHERE id = $3 RETURNING id, name, breed',
      [name, breed, id]
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating Animal: ${error.message}`);
  }
};

// Delete a Animal price by ID
const deleteAnimal = async (id) => {
  try {
    const result = await db.result(
      'DELETE FROM animals WHERE id = $1',
      [id]
    );
    return result.rowCount > 0; // Return true if a row was deleted
  } catch (error) {
    throw new Error(`Error deleting Animal: ${error.message}`);
  }
};

module.exports = { addAnimal, getAnimals, updateAnimal, deleteAnimal };
