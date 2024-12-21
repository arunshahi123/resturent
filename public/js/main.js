async function loadMenu() {
    try {
        const response = await fetch('/api/menu');
        const menuData = await response.json();
        
        const foodMenu = document.getElementById('foodMenu');
        const drinkMenu = document.getElementById('drinkMenu');

        // Add touch feedback for mobile
        const createMenuItem = (item) => `
            <div class="bg-white p-4 rounded-lg shadow-md menu-item active:bg-gray-50">
                <h4 class="text-lg md:text-xl font-bold">${item.name}</h4>
                <p class="text-sm md:text-base text-gray-600">${item.description}</p>
                <p class="text-red-800 font-bold mt-2">Rs. ${item.price}</p>
            </div>
        `;

        // Display food items
        if (foodMenu) {
            menuData.foods.forEach(item => {
                foodMenu.innerHTML += createMenuItem(item);
            });
        }

        // Display drink items
        if (drinkMenu) {
            menuData.drinks.forEach(item => {
                drinkMenu.innerHTML += createMenuItem(item);
            });
        }
    } catch (error) {
        console.error('Error loading menu:', error);
    }
}

// Add touch event handlers
document.addEventListener('DOMContentLoaded', () => {
    // Load menu when on menu page
    if (document.getElementById('foodMenu')) {
        loadMenu();
    }

    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.opacity = '0.7';
        });
        button.addEventListener('touchend', () => {
            button.style.opacity = '1';
        });
    });
});

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false); 