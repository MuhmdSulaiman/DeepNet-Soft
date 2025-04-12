const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const MenuItem = require('../models/MenuItem');
const Menu = require('../models/Menu');

router.get('/', async (req, res) => {
  try {
    const filter = req.query.menuId ? { menu: req.query.menuId } : {};
    if (req.query.isAvailable) {
      filter.isAvailable = req.query.isAvailable === 'true';
    }
    
    const items = await MenuItem.find(filter)
      .populate('menu', 'name')
      .sort('displayOrder');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new menu item
router.post('/', [
  body('name').trim().notEmpty().withMessage('Item name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('menu').notEmpty().withMessage('Menu ID is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Verify menu exists
    const menu = await Menu.findById(req.body.menu);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    const menuItem = new MenuItem({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      menu: req.body.menu,
      image: req.body.image,
      displayOrder: req.body.displayOrder
    });

    const newMenuItem = await menuItem.save();
    await newMenuItem.populate('menu', 'name');
    res.status(201).json(newMenuItem);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'An item with this name already exists in this menu' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('menu', 'name');
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update menu item
router.put('/:id', [
  body('name').trim().notEmpty().withMessage('Item name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    if (req.body.menu) {
      const menu = await Menu.findById(req.body.menu);
      if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
      }
      menuItem.menu = req.body.menu;
    }

    menuItem.name = req.body.name;
    menuItem.description = req.body.description;
    menuItem.price = req.body.price;
    menuItem.image = req.body.image || menuItem.image;
    menuItem.displayOrder = req.body.displayOrder || menuItem.displayOrder;
    menuItem.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : menuItem.isAvailable;

    const updatedMenuItem = await menuItem.save();
    await updatedMenuItem.populate('menu', 'name');
    res.json(updatedMenuItem);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'An item with this name already exists in this menu' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    await MenuItem.deleteOne({ _id: req.params.id });
    res.json({ message: 'Menu item has been deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 