const cartBtn = document.querySelector(".cart-btn");
const clearCartBtn = document.querySelector(".btn-clear");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total-value");
const cartContent = document.querySelector(".cart-list");
const productDOM = document.querySelector("#products-dom");

let buttonsDOM = [];
let cart = [];

const fetchData = async () => {
  try {
    let result = await fetch(
      "https://61ffa1355e1c4100174f6edb.mockapi.io/Products"
    );
    let data = await result.json();
    let products = data;
    UI(products);
    return products;
  } catch (err) {}
};

const UI = (products) => {
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

  localStorage.setItem("products", JSON.stringify(products));
  const getBagButtons = () => {
    const buttons = [...document.querySelectorAll(".btn-add-to-cart")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.setAttribute("disabled", "disabled");
        button.opacity = ".3";
      } else {
        button.addEventListener("click", (event) => {
          event.target.disabled = true;
          event.target.style.opacity = ".3";
          let cartItem = { ...getProduct(id), amount: 1 };
          cart = [...cart, cartItem];
          saveCart(cart);
          saveCartValues(cart);
          addCartItem(cartItem);
        });
      }
    });
  };
  sendButtons(getBagButtons());
};

const getProduct = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  return products.find((product) => product.id === id);
};

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const saveCartValues = (cart) => {
  let tempTotal = 0;
  let itemsTotal = 0;

  cart.map((item) => {
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount;
  });
  cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
  cartItems.innerText = itemsTotal;
};

const addCartItem = (item) => {
  const li = document.createElement("li");
  li.classList.add("cart-list-item");
  li.innerHTML = ` 
   <div class="cart-left">
  <div class="cart-left-image">
    <img src="${item.image}" alt="product" />
  </div>
  <div class="cart-left-info">
    <a class="cart-left-info-title" href="#">${item.title}</a>
    <span class="cart-left-info-price">$${item.price}</span>
  </div>
</div>
<div class="cart-right">
  <div class="cart-right-quantity">
    <button class="quantity-minus" data-id=${item.id}>
      <i class="fas fa-minus"></i>
    </button>
    <span class="quantity">${item.amount}</span>
    <button class="quantity-plus" data-id=${item.id}>
      <i class="fas fa-plus"></i>
    </button>
  </div>
  <div class="cart-right-remove">
    <button class="cart-remove-btn" data-id=${item.id}>
      <i class="fas fa-trash"></i>
    </button>
  </div>
</div>`;
  cartContent.appendChild(li);
};

// const getCart = () => {
// localStorage.getItem("cart")
//     ? JSON.parse(localStorage.getItem("cart"))
//     : [];  return
// };
const populateCart = (cart) => {
  cart.forEach((item) => addCartItem(item));
};
const setupApp = () => {
  cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  saveCartValues(cart);
  populateCart(cart);
  console.log(cart);
};

const cartLogic = () => {};

const sendButtons = (getBagButtons) => {
  getBagButtons();
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  setupApp();
  UI();
  sendButtons();
});
