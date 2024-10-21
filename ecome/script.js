const products = [
    { id: 1, name: "Wireless Headphones", price: 89.99, img: "https://via.placeholder.com/150?text=Headphones" },
    { id: 2, name: "Smartwatch", price: 199.99, img: "https://via.placeholder.com/150?text=Smartwatch" },
    { id: 3, name: "Bluetooth Speaker", price: 49.99, img: "https://via.placeholder.com/150?text=Speaker" },
    { id: 4, name: "Gaming Mouse", price: 29.99, img: "https://via.placeholder.com/150?text=Mouse" },
    { id: 5, name: "4K Monitor", price: 299.99, img: "https://via.placeholder.com/150?text=Monitor" },
    { id: 6, name: "Laptop Stand", price: 39.99, img: "https://via.placeholder.com/150?text=Laptop+Stand" },
    { id: 7, name: "Portable Charger", price: 25.99, img: "https://via.placeholder.com/150?text=Charger" },
    { id: 8, name: "Gaming Keyboard", price: 59.99, img: "https://via.placeholder.com/150?text=Keyboard" },
    { id: 9, name: "Wireless Mouse", price: 19.99, img: "https://via.placeholder.com/150?text=Wireless+Mouse" },
    { id: 10, name: "USB-C Hub", price: 34.99, img: "https://via.placeholder.com/150?text=USB-C+Hub" },
    { id: 11, name: "Webcam", price: 49.99, img: "https://via.placeholder.com/150?text=Webcam" },
    { id: 12, name: "Desk Lamp", price: 29.99, img: "https://via.placeholder.com/150?text=Desk+Lamp" },
];

let cart = [];

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="buyNow(${product.id})">Buy Now</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    alert(`${product.name} added to cart!`);
}

function buyNow(id) {
    const product = products.find(p => p.id === id);
    alert(`Buying ${product.name} for $${product.price.toFixed(2)}!`);
}

function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    const cartContent = cart.map(item => `${item.name}: $${item.price.toFixed(2)}`).join('\n');
    alert(`Your Cart:\n${cartContent}`);
}

displayProducts();
