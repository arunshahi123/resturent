const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Add these headers for mobile optimization
app.use((req, res, next) => {
    res.header('X-UA-Compatible', 'IE=edge,chrome=1');
    res.header('Cache-Control', 'public, max-age=31536000');
    next();
});

// Sample data for menu items
const menuItems = {
    foods: [
        {
            name: "Momo",
            description: "Nepali style dumplings filled with spiced meat or vegetables",
            price: 250
        },
        {
            name: "Dal Bhat",
            description: "Traditional Nepali meal with lentils, rice, and curry",
            price: 350
        },
        {
            name: "Thukpa",
            description: "Hot noodle soup with vegetables and meat",
            price: 200
        }
    ],
    drinks: [
        {
            name: "Masala Chai",
            description: "Spiced Nepali tea with milk",
            price: 50
        },
        {
            name: "Lassi",
            description: "Traditional yogurt-based drink",
            price: 120
        },
        {
            name: "Local Beer",
            description: "Nepali brewed beer",
            price: 250
        }
    ]
};

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'menu.html'));
});

app.get('/api/menu', (req, res) => {
    res.json(menuItems);
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/location', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'location.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 