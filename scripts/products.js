const productList = document.querySelector("#product-list");

function addToCart(value) {
    alert("Items added to cart!");
    console.log(value);
    console.log("button clicked!");
}

fetch('./assets/products.json').then((data) => {
    return data.json();
})
.then((products) => {
    products.map((product) => {
        // console.log(product);
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

        cardDiv.innerHTML += `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title fw-bold">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text fw-bold">$${product.price}</p>
                </div>
                <div id="product-card-footer" class="d-flex justify-content-center align-items-center my-3">
                    <input type="number" class="quantity-input w-25 me-3" value="1" min="1">
                    <a href="#" class="add-to-cart btn btn-primary" data-key='${JSON.stringify(product)}'>Add to Cart</a>
                </div>
            </div>
        `;

        productList.appendChild(cardDiv);
    });
})
.catch((err) => {
    console.log(`Something went wrong!\n${err}`);
})
.finally(() => {
    const addToCartBtns = document.querySelectorAll(".add-to-cart");
    addToCartBtns.forEach(element => {
        element.addEventListener("click", () => {
            addToCart(element.getAttribute("data-key"));
        });
    });
});

// fetch('https://fakestoreapi.com/products/').then((data) => {
//     console.log(data);
// });

// products.map((product) => {
//     productList.innerHTML += `
//         <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
//                 <div class="card h-100">
//                     <img src="${product.image}" class="card-img-top" alt="${product.name}">
//                     <div class="card-body text-center">
//                         <h5 class="card-title fw-bold">${product.name}</h5>
//                         <p class="card-text">${product.description}</p>
//                         <p class="card-text fw-bold">$${product.price}</p>
//                     </div>
//                     <div id="product-card-footer" class="d-flex justify-content-center align-items-center my-3">
//                         <input type="number" class="quantity-input w-25 me-3" value="1" min="1">
//                         <a href="#" class="btn btn-primary">Add to Cart</a>
//                     </div>
//                 </div>
//             </div>
//     `
    // const cardInnerDiv = document.createElement("div");
    // cardInnerDiv.classList.add("card", "h-100");

    // const cardImage = document.createElement("img");
    // cardImage.classList.add("card-img-top");
    // cardImage.setAttribute("src", product.image);
    // cardImage.setAttribute("alt", product.name);

    // const cardBodyDiv = document.createElement("div");
    // cardBodyDiv.classList.add("card-body", "text-center");
                    
    // const cardTitle = document.createElement("h5");
    // cardTitle.classList.add("card-title", "fw-bold");

    // const cardDescription = document.createElement("p");
    // cardDescription.classList.add("card-text");

    // const cardPrice = document.createElement("p");
    // cardPrice.classList.add("card-text", "fw-bold");
// });