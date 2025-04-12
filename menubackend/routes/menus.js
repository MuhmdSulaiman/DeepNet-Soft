const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
  
    jwt.verify(token, "1234", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Please login to create menu' });
      }
  
      req.user = decoded;  
      console.log(decoded)
      next();  
    });
  };
// Get all menus
router.get('/viewmenu',  verifyToken, async (req, res) => {
  try {
    const menus = await Menu.find({ isActive: true }).sort('displayOrder');
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get one menu item by ID
router.get('/viewmenu/:id', verifyToken, async (req, res) => {
    try {
      const menu = await Menu.findById(req.params.id);
  
      if (!menu || !menu.isActive) {
        return res.status(404).json({ message: 'Menu item not found or inactive' });
      }
  
      res.json(menu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// Create a new menu
router.post('/create', verifyToken, [
  body('name').trim().notEmpty().withMessage('Menu name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isIn(['Food', 'Snack', 'Drink', 'Dessert']).withMessage('Invalid category')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const menu = new Menu({

      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
        
    });
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({ message: 'A menu with this name already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Get menu by ID with its items
router.get('/:id',verifyToken, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    
    const menuItems = await MenuItem.find({ menu: req.params.id, isAvailable: true })
      .sort('displayOrder');
    
    res.json({
      menu,
      items: menuItems
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update menu
router.put('/:id', verifyToken, [
  body('name').trim().notEmpty().withMessage('Menu name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isIn(['Food', 'Snack', 'Drink', 'Dessert']).withMessage('Invalid category')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    menu.name = req.body.name;
    menu.description = req.body.description;
    menu.price = req.body.price;
    menu.category = req.body.category;
    const updatedMenu = await menu.save();
    res.json(updatedMenu);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'A menu with this name already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Delete menu
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    // Check if menu has items
    const menuItemsCount = await MenuItem.countDocuments({ menu: req.params.id });
    if (menuItemsCount > 0) {
      // Soft delete by setting isActive to false
      menu.isActive = false;
      await menu.save();
      res.json({ message: 'Menu has been deactivated' });
    } else {
      // Hard delete if no items exist
      await Menu.deleteOne({ _id: req.params.id });
      res.json({ message: 'Menu has been deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 