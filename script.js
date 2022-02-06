const cartBtn = document.querySelector(".cart-btn");
const clearCartBtn = document.querySelector(".btn-clear");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total-value");
const cartContent = document.querySelector(".cart-list");
const productDOM = document.querySelector("#products-dom");

const fetchData = async () => {
  try {
    let result = await fetch(
      "https://61ffa1355e1c4100174f6edb.mockapi.io/Products"
    );
    let data = await result.json();
    let products = data;
    UI(products);
    console.log(products, "data");
    return products;
  } catch (err) {
    console.log(err, "error var");
  }
};

const UI = (products) => {
  console.log(" productssssssss", products);
  let result = "";
  products.forEach((element) => {
    result += `
    <div class="col-md-4 col-lg-4">
          <div class="product">
            <div class="product-image">
              <img src="${element.image}" alt="product">
            </div>
            <div class="product-hover">
              <span class="product-title">${element.title}</span>
              <span class="product-price">${element.price}</span>
              <button class="btn-add-to-cart" data-id=${element.id}>
                <i class="fas fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
    `;
    productDOM.innerHTML = result;
  });
};
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
