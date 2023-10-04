const products = [
    { id: 1, name: 'Perfume Lacoste', price: 75.00, description: 'Um perfume elegante e sofisticado.' },
    { id: 2, name: 'Hidratante para o rosto', price: 100.00, description: 'Hidrata e nutre a pele do rosto.' },
    { id: 3, name: 'Hidratante para as mãos', price: 20.00, description: 'Hidratação instantânea para suas mãos.' },
];

const cartItems = [];

function displayProducts() {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Preço: R$ ${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}" data-price="${product.price}">Adicionar ao Carrinho</button>
        `;
        productsContainer.appendChild(productItem);
    });
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(cartItem => {
        const cartItemElement = document.createElement('li');
        cartItemElement.textContent = `Produto (R$ ${cartItem.price.toFixed(2)})`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('remove-from-cart');
        removeButton.setAttribute('data-id', cartItem.id);
        removeButton.setAttribute('data-price', cartItem.price.toFixed(2));
        cartItemElement.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItemElement);
    });
}

function addToCart(id, price) {
    const newItem = { id, price };
    cartItems.push(newItem);

    displayCart();

    const cartTotal = document.getElementById('cart-total');
    const currentTotal = parseFloat(cartTotal.textContent);
    const newTotal = currentTotal + price;
    cartTotal.textContent = newTotal.toFixed(2);
}

function removeFromCart(id, price) {
   
    const index = cartItems.findIndex(item => item.id === id);

    if (index !== -1) {
        cartItems.splice(index, 1);

        displayCart();

        const cartTotal = document.getElementById('cart-total');
        const currentTotal = parseFloat(cartTotal.textContent);
        const newTotal = currentTotal - price;
        cartTotal.textContent = newTotal.toFixed(2);
    }
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart')) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const price = parseFloat(event.target.getAttribute('data-price'));
        addToCart(id, price);
    }
    
    if (event.target.classList.contains('remove-from-cart')) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const price = parseFloat(event.target.getAttribute('data-price'));
        removeFromCart(id, price);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
});