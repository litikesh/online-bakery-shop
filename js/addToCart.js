let cartArray = [];
let totalAmount = 0;
let totalPrice = 0;
let TotalItem = 0;

let products = [
  {
    id: "1",
    name: "New York Cheesecake",
    tag: "cake1",
    desc: "This type of cheesecake is very minimalistic. The flavors are simple but the finish is mesmerising. Lightly golden on top, silky smooth interior optionally.",
    Aprice: 260,
    price: 100,
    rating: 3,
    inCart: 0,
    image: "../images/product/c1.jpg",
  },
  {
    id: "2",
    name: "Italian Ricotta Cheesecake",
    tag: "cake2",
    desc: "Nothing beats a creamy, silky, decadent cheesecake and now you don’t have to limit yourself to just one type. There are so many cheesecakes to try.",
    Aprice: 260,
    price: 200,
    rating: 3,
    inCart: 0,
    image: "../images/product/c2.jpg",
  },

  {
    id: "3",
    name: " Pumpkin Spice Latte Cupcakes",
    tag: "cake3",
    desc: " These taste like spiced pumpkin cupcakes spiked with a shot of coffee and topped with perhaps the most amazing whipped cream frosting to ever touch my lips.",
    Aprice: 260,
    price: 300,
    rating: 3,
    inCart: 0,
    image: "../images/product/cupcake.jpg",
  },
];

function displayProduct() {
  document.querySelector(".products-grid").innerHTML = "";
  products.map((items, id) => {
    document.querySelector(".products-grid").innerHTML += `
        <div class="dish-card">
        <div class="card-image-container">
          <img src="${items.image}" alt="" class="card-image" />
        </div>

        <div class="card-info-container">
          <h3 class="card-info-heading">${items.name}</h3>
          <span class="cart-rating">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
          </span>
          <p class="card-info-para">
           ${items.desc}
          </p>

          <div class="card-price-details">
            <p class="plan__Aprice"><b>Rs. ${items.Aprice}</b></p>
            <p class="plan__price">
              <s>Rs. ${items.price}</s>
            </p>
          </div>
          <br />
          <button id=${items.id} class="btn-card" onclick="addToCart(this)">
            <span class="material-icons add-cart">Add To cart</span>
          </button>
        </div>
      </div>`;
  });
}
setTimeout(function () {
  displayProduct();
}, 500);

function addToCart(e) {
  let id = e.closest(".btn-card").id;

  for (let i = 0; i < products.length; i++) {
    let pid = products[i].id;
    if (pid === id) {
      cartNumbers(products[i]);
      totalCost(products[i]);
    }
  }
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  // console.log("My cart is ", cartItems);

  if (cartItems != null) {
    if (cartItems[product.id] == undefined) {
      cartItems = {
        ...cartItems,
        [product.id]: product,
      };
    }
    cartItems[product.id].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.id]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  // console.log("The products price is, ", product.price);

  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  totalAmount = 0;
  document.querySelector(".item-price").textContent = "0";
  document.querySelector(".total-amount").textContent = "0";
  document.querySelector(".cart-item").innerHTML = "";
  let cartCost = localStorage.getItem("totalCost");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  // console.log(cartItems);
  let productContainer = document.querySelector(".cart-item");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      cartArray.push(item);
    });
  }
  for (var i = 0; i < cartArray.length; i++) {
    totalPrice += cartArray[i].price;
  }

  if (cartArray.length > 0) {
    cartArray.map((item, id) => {
      productContainer.innerHTML += `
      <article class="card">
      <input type="hidden" value="${item.id}" id="itemId">
      <div class="card__img__container">
        <img
          class="card__img"
          src="${item.image}"
        />
      </div>
      <div class="card__content">
        <h3 class="card__title">${item.name}</h3>
        <span class="rating">
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
        </span>
        <p class="card__desc">
         ${item.desc}
        </p>

        <div class="price__details">
          <p class="plan__Aprice"><b>Rs. ${item.price}</b></p>
          <p class="plan__price">
            <s>Rs. ${item.Aprice}</s>
          </p>
        </div>

        <div class="plan__new">
          <div class="plan__info">
            <span class="decreaseQty" onclick="decreaseQty(this)"
              ><i class="fa fa-minus" aria-hidden="true"></i
            ></span>
            <input type="number" id=${item.id}  readonly value="1" class="in-box" />
            <span class="increaseQty" onclick="increaseQty(this)"
              ><i class="fa fa-plus" aria-hidden="true"></i
            ></span>
          </div>
          <div class="pay__btn" id=${item.id} onclick="promptYes(this)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </article>
   `;
      document.querySelector(".cart-count").textContent = cartArray.length;
      document.querySelector(".count").textContent = cartArray.length;
      totalAmount += item.price;
      document.querySelector(".item-price").textContent = totalPrice;
      document.querySelector(".total-amount").textContent = totalAmount - 50;
    });
  } else {
    document.querySelector(".summary").style.display = "none";
    document.querySelector(".cart-inner").innerHTML = ` <div class="cart-items">
    <img
      src="./images/emptyPage/emptyCart.svg"
      class="cart-empty"
      alt="img"
    />
  </div>
  <div class="cart__checkout">
    <h4>Your cart feels lonely.</h4>
    <p>
      Your shopping cart lives to serve. Give it purpose - fill it with
      books, electronicts, videos, etc. and make it happy.
    </p>
    <div class="buttons">
      <a href="/">
        <button class="con-btn">
          CONTINUE SHOPPING
          <ArrowForwardIcon />
        </button>
      </a>
    </div>
  </div>`;
  }
}

const decreaseQty = (e) => {
  e.closest("article").classList.add("add");
  let id = e.closest("article.add").querySelector("#itemId").value;
  let value = e
    .closest("article.add")
    .querySelector('input[type="number"]').value;
  let newAmount = 0;

  for (var i = 0; i < cartArray.length; i++) {
    if (cartArray[i].id === id) {
      if (value != 1) {
        newAmount = cartArray[i].price;
        value = isNaN(value) ? 0 : value;
        value--;
      }
      e.closest("article.add").querySelector('input[type="number"]').value =
        value;
    }
  }
  totalPrice -= newAmount;
  totalAmount -= newAmount;
  document.querySelector(".item-price").textContent = totalPrice;
  document.querySelector(".total-amount").textContent = totalAmount;
  setTimeout(function () {
    e.closest("article").classList.remove("add");
  }, 500);
};

const increaseQty = (e) => {
  e.closest("article").classList.add("add");
  let id = e.closest("article.add").querySelector("#itemId").value;
  let value = e
    .closest("article.add")
    .querySelector('input[type="number"]').value;
  let newAmount = 0;
  for (var i = 0; i < cartArray.length; i++) {
    if (cartArray[i].id === id) {
      value = isNaN(value) ? 0 : value;
      value++;
      newAmount = cartArray[i].price;

      e.closest("article.add").querySelector('input[type="number"]').value =
        value;
    }
  }

  totalPrice += newAmount;
  totalAmount += newAmount;
  document.querySelector(".item-price").textContent = totalPrice;
  document.querySelector(".total-amount").textContent = totalAmount;
  setTimeout(function () {
    e.closest("article").classList.remove("add");
  }, 500);
};

function promptYes(e) {
  e.closest("article").classList.add("selected");
  let id = e.closest("article.selected").querySelector("#itemId").value;
  const newPro = JSON.parse(localStorage.getItem("productsInCart"));

  let len = Object.keys(newPro).length;

  if (len === 1) {
    localStorage.removeItem("productsInCart");
    localStorage.removeItem("totalCost");
    localStorage.removeItem("cartNumbers");
  }
  if (len > 1) {
    // var indexToRemove = 0;
    // Object.keys(newPro).map((index) => {
    //   if (index === id) {
    //     indexToRemove = index;
    //   }
    // });
    // localStorage.setItem("productsInCart", JSON.stringify(newPro));

    for (var i = 0; i < len; i++) {
      var index = JSON.parse(Object.keys(newPro)[i]);

      if (index != id) {
        var newItem = JSON.stringify(Object.values(newPro)[i]);
        localStorage.setItem("productsInCart", newItem);
        break;
      }
    }
  }

  for (var i = 0; i < cartArray.length; i++) {
    if (cartArray[i].id === id) {
      totalPrice = totalPrice - cartArray[i].price;
      cartArray.splice(i, 1);
      break;
    }
  }

  document.querySelector("article.selected").classList.add("zoom");
}

setTimeout(function () {
  onLoadCartNumbers();
}, 500);

setTimeout(function () {
  displayCart();
}, 500);
