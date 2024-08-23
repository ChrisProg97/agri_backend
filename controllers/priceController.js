const priceService = require('../services/priceService');

const addPrice = async (req, res) => {
 
  const { crop_id, market_id, price, userId } = req.body;

  try {
    const result = await priceService.addPrice(crop_id, market_id, price, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addAnimalPrice = async (req, res) => {
 
  const { animal_id, market_id, price, userId } = req.body;

  try {
    const result = await priceService.addAnimalPrice(animal_id, market_id, price, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnimalPrices = async (req, res) => {
  const  marketId  = req.params.market_id;
  try {
    const anima_price = await priceService.getAnimalPrices(marketId);
    res.status(200).json(anima_price);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getPricesWithDetails = async (req, res) => {
  try {
    const prices = await priceService.getPricesWithDetails();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPricesByMarket = async (req, res) => {
  const  marketId  = req.params.market_id;

  try {
    const prices = await priceService.getPricesByMarket(marketId);
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getPrices = async (req, res) => {
  try {
    const prices = await priceService.getPrices();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePrice = async (req, res) => {
  const { id } = req.params;
  const { crop_id, market_id, price } = req.body;
  
  try {
    const updatedPrice = await priceService.updatePrice(id, crop_id, market_id, price);
    res.status(200).json(updatedPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePrice = async (req, res) => {
  const { id } = req.params;

  try {
    const isDeleted = await priceService.deletePrice(id);
    if (isDeleted) {
      res.status(204).end(); // No content
    } else {
      res.status(404).json({ error: 'Price not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addPrice, addAnimalPrice, getAnimalPrices, getPricesWithDetails, getPricesByMarket, getPrices, updatePrice, deletePrice };
