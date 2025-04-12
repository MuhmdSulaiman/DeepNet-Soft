var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // 'Bearer <token>'
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  // Verify the token using the secret key and handle errors
  jwt.verify(token,"1234", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    req.user = decoded; 
    console.log(decoded)
    next();  
  });
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
  }
  next();
};

// User registration
router.post('/signupapi', (req, res) => {
    const {username, email, password, confirmPassword,role} = req.body;
 
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password do not match' });
    }
 
    // Check all fields are not empty
    const user = new User({ username,email, password,role });
    const validationError = user.validateSync();
 
    if (validationError) {
      return res.status(400).json({ error: validationError.errors });
    }
 
    // Check if the email is already taken
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ message: 'Email already taken' });
        }
 
        // Hash the password using bcrypt
        return bcrypt.hash(password, 10);
      })
      .then(hashedPassword => {
        // Create a new user in MongoDB
        const newUser = new User({ username,email, password: hashedPassword,role });
        return newUser.save();
      })
      .then(() => {
        // Respond with success
        res.status(201).json({ message: 'Account created successfully' });
      })
      .catch(error => {
          res.status(500).json({ message: 'Internal Server Error' });
        });
        
    });
    
 
// User login
router.post('/loginapi', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, '1234', { expiresIn: '1h' });
        console.log(token,user.role)
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;