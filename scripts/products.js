const productList = document.querySelector("#product-list");

function addToCart(value, quantity) {
    const existingCart = localStorage.getItem("cart");
    let cart = existingCart ? JSON.parse(existingCart) : [];

    const existingProduct = cart.find((cartProduct) => cartProduct.name === value.name);

    if(existingProduct) {
        existingProduct.quantity += quantity;
        console.log(`Updated quantity for ${value.name}`);
    } else {
        value.quantity = quantity;
        cart.push(value);
        console.log(`Added ${value.name} to cart`);
    }

    alert(`${quantity} ${value.name} added to cart!`);
    
    console.log(JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("button clicked!");
}

fetch('./assets/products.json').then((data) => {
    return data.json();
})
.then((products) => {
    let htmlContent = "";
    products.forEach((product) => {
        // productList.innerHTML += `
        // productList.insertAdjacentHTML('beforeend', `
        htmlContent += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text fw-bold">$${product.price}</p>
                    </div>
                    <div id="product-card-footer" class="d-flex justify-content-center align-items-center my-3">
                        <input type="number" class="quantity-input w-25 me-3" value="1" min="1">
                        <a href="#" class="add-to-cart btn btn-primary" data-product='${JSON.stringify(product)}'>Add to Cart</a>
                    </div>
                </div>
            </div>
        `;
    });

    productList.innerHTML = htmlContent;

    const addToCartBtns = document.querySelectorAll(".add-to-cart");

    addToCartBtns.forEach(element => {
        element.addEventListener("click", (event) => {
            event.preventDefault();

            const product = JSON.parse(event.target.getAttribute("data-product"));
            const parentElement = element.parentNode;
            const quantityInputElement = parentElement.querySelector(".quantity-input");

            addToCart(product, parseInt(quantityInputElement.value));
        });
    });
})
.catch((err) => {
    console.log(`Something went wrong!\n${err}`);
});

// fetch('https://fakestoreapi.com/products/').then((data) => {
//     console.log(data);
// });