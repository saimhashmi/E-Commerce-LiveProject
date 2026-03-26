const productList = document.querySelector("#product-list");
const searchInput = document.querySelector("#search");
const priceRange = document.querySelector("#price-range");
let productsList = [];

// Classes
class Product {
    constructor(name, description, image, price, quantity) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }
}

class DiscountedProduct extends Product {
    constructor(name, description, image, price, quantity, discount) {
        super(name, description, image, price, quantity);
        this.discount = discount;
    }

    display() {
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="products scale card h-100">
                    <img src="${this.image}" class="card-img-top" alt="${this.name}">
                    <div id="card-body" class="card-body text-center">
                        <h5 class="card-title-custom fw-bold">${this.name}</h5>
                        <p class="card-text-custom text-secondary">${this.description}</p>
                        <p class="card-text-custom text-secondary fw-bold">
                            <s>$${parseFloat(this.price).toFixed(2)}</s>
                            $${(parseFloat(this.price)-parseFloat(this.price)*0.3).toFixed(2)}
                        </p>
                        <span id="card-discount">${this.discount}% Off</span>
                    </div>
                    <div id="product-card-footer" class="d-flex justify-content-center align-items-center my-3">
                        <input type="number" class="quantity-input w-25 me-3" value="1" min="1">
                        <a href="#" class="add-to-cart btn btn-primary" data-product='${JSON.stringify(this)}'>Add to Cart</a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Funtions
function renderProductList(products) {
    let htmlContent = "";
    productList.innerHTML = "";
    products.forEach((product) => {
        // productList.innerHTML += `
        // productList.insertAdjacentHTML('beforeend', `
        htmlContent += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="products scale card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div id="card-body" class="card-body text-center">
                        <h5 class="card-title-custom fw-bold">${product.name}</h5>
                        <p class="card-text-custom text-secondary">${product.description}</p>
                        <p class="card-text-custom text-secondary fw-bold">$${product.price.toFixed(2)}</p>
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
}

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

function applyFilters() {
    const query = searchInput.value.trim()?.toLowerCase();
    console.log(query);
    const price = priceRange.value?.trim();
    let minPrice = 0;
    let maxPrice = Infinity;
    if(price) {
        [minPrice, maxPrice] = price.split("-").map(value => parseInt(value));
        console.log(minPrice, maxPrice);
    }

    const filteredProducts = productsList.filter((product) => {
        return (
            product.name.toLowerCase().includes(query) 
            ||
            product.description.toLowerCase().includes(query)
        ) && (
            product.price >= minPrice && product.price <= maxPrice
        );
    });
    console.log(filteredProducts);
    renderProductList(filteredProducts);
}

// Fetching product data from API or JSON file
fetch('./assets/products.json').then((response) => {
    return response.json();
})
.then((data) => {
    productsList = JSON.parse(JSON.stringify(data));

    // Dynamically add all the Products on products page
    renderProductList(data);

    // Create discounted product object
    const discountedProduct = new DiscountedProduct(
        'Dummy Discounted Product',
        'This is a Dummy Discounted Product.',
        'https://placehold.co/400x300?text=Dummy+Discounted+Product',
        99.99,
        1,
        30
    );

    // Display discounted product
    productList.innerHTML += discountedProduct.display();

    // Attach Event Listners to all the add to cart buttons
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

// Attach Event Listners to Filter inputs
// Using Debouncing (From Loadash) for Search Functionality to reduce load
searchInput.addEventListener("keyup", _.debounce(applyFilters, 500));
priceRange.addEventListener("change", applyFilters);