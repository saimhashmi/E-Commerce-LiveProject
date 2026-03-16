const cartSection = document.querySelector(".cart-section");
const totalPriceElement = document.getElementById("total-price");

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = 0;

    cartSection.innerHTML = "";

    cart.forEach((cartProduct) => {
        cartSection.insertAdjacentHTML('beforeend', `
            <div class="col-lg-3 col-md-4 col-sm-6 my-2">
                <div class="card h-100">
                    <img src="${cartProduct.image}" alt="${cartProduct.name}" class="card-img-top" >
                    <div class="card-body card-body text-center">
                        <p class="card-title fw-bold">${cartProduct.name}</p>
                        <p class="card-text fw-bold">$${cartProduct.price}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center m-3">
                        <input type="number" class="cart-quantity-input w-25 me-3" value="${cartProduct.quantity}" min="1" data-product='${JSON.stringify(cartProduct)}'>
                        <a href="#" class="remove-from-cart btn btn-danger" data-product='${JSON.stringify(cartProduct)}'>Remove</a>
                    </div>
                </div>
            </div>
        `);

        totalPrice += cartProduct.price * cartProduct.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Event delegation - attach listeners ONCE to parent
cartSection.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart")) {
        event.preventDefault();
        const product = JSON.parse(event.target.getAttribute("data-product"));
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart = cart.filter((cartProduct) => cartProduct.name !== product.name);
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(`Removed ${product.name} from cart`);
        // alert(`${product.name} removed from cart!`);
        renderCart();
    }
});

cartSection.addEventListener("change", (event) => {
    if (event.target.classList.contains("cart-quantity-input")) {
        const newQuantity = parseInt(event.target.value);
        const product = JSON.parse(event.target.getAttribute("data-product"));
        let cart = JSON.parse(localStorage.getItem("cart"));
        const existingProduct = cart.find((cartProduct) => cartProduct.name === product.name);
        if (existingProduct) {
            existingProduct.quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(`Updated quantity for ${product.name} to ${newQuantity}`);
            // alert(`Updated quantity for ${product.name} to ${newQuantity}!`);
            renderCart();
        }
    }
});

renderCart();