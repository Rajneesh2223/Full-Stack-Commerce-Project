// index.js

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 4000;

// Essential Environment Variables Check
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

if (!JWT_SECRET || !MONGODB_URI) {
    console.error('FATAL ERROR: Required environment variables are not defined.');
    process.exit(1);
}

// Rate Limiting Configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware Setup
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use('/uploads', express.static('uploads'));

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
});

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Schema Definitions
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [2, 'Product name must be at least 2 characters long'],
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Toys', 'Sports', 'Other']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        review: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    cartData: {
        type: Map,
        of: Number,
        default: new Map()
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Password Hashing Middleware
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Models
const Product = mongoose.model("Product", ProductSchema);
const Users = mongoose.model('Users', UserSchema);

// Authentication Middleware
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ error: "Please authenticate using a valid token" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await Users.findById(decoded.user.id);
        
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ error: "Invalid token" });
    }
};

// Admin Authorization Middleware
const isAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }
    next();
};

// User Routes
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "Email already exists"
            });
        }

        const user = new Users({
            name: username,
            email,
            password
        });

        await user.save();

        const token = jwt.sign({
            user: { id: user.id }
        }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ 
            success: true, 
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        }

        const token = jwt.sign({
            user: { id: user.id }
        }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ 
            success: true, 
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// Product Routes
app.post('/addproduct', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { name, category, price, description, stock } = req.body;
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "Product image is required"
            });
        }

        const product = new Product({
            name,
            category,
            price,
            description,
            stock,
            image: `/uploads/${req.file.filename}`
        });

        await product.save();

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/allproducts', async (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 10 } = req.query;
        
        const query = {};
        if (category) {
            query.category = category;
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(':');
            sortOptions[field] = order === 'desc' ? -1 : 1;
        }

        const products = await Product.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Product.countDocuments(query);

        res.json({
            success: true,
            products,
            total,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

app.put('/product/:id', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { name, category, price, description, stock } = req.body;
        const updateData = { name, category, price, description, stock };
        
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.delete('/product/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// Cart Routes
app.post('/getcart', authenticateToken, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        const cartItems = {};

        // Fetch cart items based on user's cart data
        for (const [productId, quantity] of user.cartData.entries()) {
            const product = await Product.findById(productId);
            if (product) {
                cartItems[productId] = quantity;
            }
        }

        res.json({
            success: true,
            cart: cartItems
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// API to add an item to the cart
app.post('/addtocart', authenticateToken, async (req, res) => {
    try {
        const { itemId } = req.body;

        // Find the product to add to the cart
        const product = await Product.findById(itemId);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        const user = await Users.findById(req.user.id);
        const currentQuantity = user.cartData.get(itemId) || 0;
        user.cartData.set(itemId, currentQuantity + 1); // Add 1 to the cart quantity
        await user.save();

        res.json({
            success: true,
            cart: Object.fromEntries(user.cartData)
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// API to remove an item from the cart
app.post('/removefromcart', authenticateToken, async (req, res) => {
    try {
        const { itemId } = req.body;

        // Find the product to remove from the cart
        const product = await Product.findById(itemId);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        const user = await Users.findById(req.user.id);
        const currentQuantity = user.cartData.get(itemId) || 0;

        if (currentQuantity > 0) {
            user.cartData.set(itemId, currentQuantity - 1); // Decrease cart quantity by 1
        }

        await user.save();

        res.json({
            success: true,
            cart: Object.fromEntries(user.cartData)
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// API to update the cart (for changing the quantity of items)
app.put('/updatecart', authenticateToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (quantity < 0) {
            return res.status(400).json({
                success: false,
                error: "Quantity cannot be negative"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        const user = await Users.findById(req.user.id);

        if (quantity === 0) {
            user.cartData.delete(productId); // Remove the product from the cart
        } else {
            user.cartData.set(productId, quantity); // Set the updated quantity for the product
        }

        await user.save();

        res.json({
            success: true,
            cart: Object.fromEntries(user.cartData)
        });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// API to clear the cart
app.delete('/clearcart', authenticateToken, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        user.cartData.clear(); // Clear all items from the cart
        await user.save();

        res.json({
            success: true,
            message: "Cart cleared successfully"
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// new collections 
app.get('/newcollections', async (req, res) => {
    try {
      // Fetch new collections from the database
      const newCollections = await Product.find({ isNew: true }).limit(10); // Assuming you have an "isNew" field that marks new collections
  
      if (!newCollections.length) {
        return res.status(404).json({
          success: false,
          message: 'No new collections found.',
        });
      }
  
      res.json({
        success: true,
        data: newCollections,
      });
    } catch (error) {
      console.error('Error fetching new collections:', error);
      res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  });
// popular in women
app.get('/popularinwomen', async (req, res) => {
    try {
      // Fetch products marked as "popular" and belonging to the women category
      const popularProducts = await Product.find({ category: 'women', isPopular: true }).limit(8); // You can adjust the query as needed
  
      if (!popularProducts.length) {
        return res.status(404).json({
          success: false,
          message: 'No popular products found for women.',
        });
      }
  
      res.json({
        success: true,
        data: popularProducts,
      });
    } catch (error) {
      console.error('Error fetching popular products:', error);
      res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  });

// Ratings and Reviews Routes
app.post('/product/:id/rate', authenticateToken, async (req, res) => {
    try {
        const { rating, review } = req.body;
        
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                error: "Rating must be between 1 and 5"
            });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        // Check if user has already rated
        const existingRatingIndex = product.ratings.findIndex(
            r => r.user.toString() === req.user.id
        );

        if (existingRatingIndex !== -1) {
            // Update existing rating
            product.ratings[existingRatingIndex] = {
                user: req.user.id,
                rating,
                review: review || product.ratings[existingRatingIndex].review,
                date: Date.now()
            };
        } else {
            // Add new rating
            product.ratings.push({
                user: req.user.id,
                rating,
                review,
                date: Date.now()
            });
        }

        // Update average rating
        const totalRatings = product.ratings.reduce((sum, r) => sum + r.rating, 0);
        product.averageRating = totalRatings / product.ratings.length;

        await product.save();

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Rate product error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// User Profile Routes
app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

app.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { name, email } = req.body;
        
        // Check if email is being changed and if it's already in use
        if (email && email !== req.user.email) {
            const existingUser = await Users.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    error: "Email already in use"
                });
            }
        }

        const user = await Users.findByIdAndUpdate(
            req.user.id,
            { 
                name: name || req.user.name,
                email: email || req.user.email
            },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.put('/changepassword', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            });
        }

        const user = await Users.findById(req.user.id);
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                error: "Current password is incorrect"
            });
        }

        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Admin Dashboard Routes
app.get('/admin/stats', authenticateToken, isAdmin, async (req, res) => {
    try {
        const totalUsers = await Users.countDocuments({ role: 'user' });
        const totalProducts = await Product.countDocuments();
        const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });
        
        const productsWithRatings = await Product.find({ 'ratings.0': { $exists: true } });
        const averageRating = productsWithRatings.reduce((sum, product) => 
            sum + product.averageRating, 0) / (productsWithRatings.length || 1);

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalProducts,
                lowStockProducts,
                averageRating: parseFloat(averageRating.toFixed(2))
            }
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: "File size is too large. Maximum size is 5MB"
            });
        }
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
    
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' 
            ? "Something went wrong!" 
            : err.message
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route not found"
    });
});
app.get('/newcollections', (req, res) => {
    res.json(newCollections);
  });

// Graceful Shutdown
const gracefulShutdown = () => {
    console.log('Received shutdown signal. Closing HTTP server...');
    app.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });

    // Force close after 10 seconds
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});