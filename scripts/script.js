const featuredProductsContainer = document.querySelector(".featured-products");

fetch('https://fakestoreapi.com/products/').then((data) => {
    return data.json();
})
.then((products) => {
    // console.log(products);
    let htmlContent = "";
    products.forEach((product) => {
        htmlContent += `
            <div class="featured-product scale">
                <figure>
                    <img src="${product.image}" alt="${product.title}" class="featured-product-image">
                    <figcaption class="featured-image-text">${product.title}</figcaption>
                </figure>
                <p class="featured-product-price">$${product.price}</p>
            </div>
        `;
    });
    featuredProductsContainer.insertAdjacentHTML('beforeend', htmlContent);
});