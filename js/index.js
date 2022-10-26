const toggleForm = () => {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
};

const myFunction = () => {
  var len = document.getElementsByClassName("search-field")[0].value.length;

  if (len == 0) {
    document.getElementsByClassName("fa-search")[0].style.visibility =
      "visible";
  } else {
    document.getElementsByClassName("fa-search")[0].style.visibility = "hidden";
  }
};

// product
let totalAmount = 0;
let totalPrice = 0;
let TotalItem = 0;
let cartArray = [];
let items = [
  {
    id: "1",
    name: "New York Cheesecake",
    desc: "This type of cheesecake is very minimalistic. The flavors are simple but the finish is mesmerising. Lightly golden on top, silky smooth interior, optionally topped with a strawberry compote; yum.",
    Aprice: 260,
    Dprice: 100,
    inCart: 0,
    image: "../images/product/c1.jpg",
  },
  {
    id: "2",
    name: "Italian Ricotta Cheesecake",
    desc: "Nothing beats a creamy, silky, decadent cheesecake and now you don’t have to limit yourself to just one type. There are so many cheesecakes to try.",
    Aprice: 260,
    Dprice: 200,
    inCart: 0,
    image: "../images/product/c2.jpg",
  },

  {
    id: "3",
    name: " Pumpkin Spice Latte Cupcakes",
    desc: " These taste like spiced pumpkin cupcakes spiked with a shot of coffee and topped with perhaps the most amazing whipped cream frosting to ever touch my lips.",
    Aprice: 260,
    Dprice: 300,
    inCart: 0,
    image: "../images/product/cupcake.jpg",
  },
];

items.map((item) => {
  cartArray.push(item);
});

for (var i = 0; i < cartArray.length; i++) {
  totalPrice += cartArray[i].Dprice;
}

const shippingCart = () => {
  totalAmount = 0;
  document.querySelector(".item-price").textContent = "0";
  document.querySelector(".total-amount").textContent = "0";
  document.querySelector(".cart-item").innerHTML = "";
  document.querySelector(".cart-count").textContent = 0;
  document.querySelector(".count").textContent = 0;
  if (cartArray.length > 0) {
    cartArray.map((item, id) => {
      document.querySelector(".cart-item").innerHTML += `
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
          <p class="plan__Aprice"><b>Rs. ${item.Dprice}</b></p>
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
      totalAmount += item.Dprice;
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
      <a href="/products">
        <button class="con-btn">
          CONTINUE SHOPPING
          <ArrowForwardIcon />
        </button>
      </a>
    </div>
  </div>`;
  }
};

shippingCart();

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
        newAmount = cartArray[i].Dprice;
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
      newAmount = cartArray[i].Dprice;

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
  for (var i = 0; i < cartArray.length; i++) {
    if (cartArray[i].id === id) {
      totalPrice = totalPrice - cartArray[i].Dprice;
      cartArray.splice(i, 1);
      break;
    }
  }

  document.querySelector("article.selected").classList.add("zoom");
  setTimeout(function () {
    shippingCart();
  }, 600);
}
