const featuredProductsContainer = document.getElementById("featured-products");

fetch('https://fakestoreapi.com/products/').then((data) => {
    console.log(data);
});