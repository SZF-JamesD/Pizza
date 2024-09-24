/* 
function to summarize the order -just need to add extras
after "order" a summary is displayed*/
//click pizza, brings up extras menu, then all together into shopping cart
/*error handling - all required fields are filled -done?
feedback of invalid inputs or missing selections*/
//get extras into the pizza
/*confirmation message when order is placed
visually highlight selected options*/
const orderButton = document.getElementById("order");
const deliveryInfo = document.getElementById("delInfo");
var total = 0;
var totalWithoutDelivery = total;
var extrasMenu = document.getElementById("extraMenu");
var extras = [
  "Extra cheese",
  "Spicy",
  "Garlic",
  "Tuna",
  "Salami",
  "Onion",
  "Seafood",
  "Egg",
];
let pizzaSelection;
let buildPizza;
let ordersList;
const delivery = document.getElementById("del");

const pizzas = [
  { value: "pepperoni", label: "Pepperoni", price: 14 },
  { value: "kebab", label: "Kebab", price: 12 },
  { value: "mushroom", label: "Mushroom", price: 13 },
  { value: "seafood", label: "Seafood", price: 15 },
  { value: "vegetarian", label: "Vegetarian", price: 10 },
];

function createMenu() {
  pizzaSelection = document.getElementById("pizzaSelection");

  pizzas.forEach((pizza) => {
    const pizzaLabel = document.createElement("label");

    const pizzaInput = document.createElement("input");
    pizzaInput.type = "radio";
    pizzaInput.name = "pizza";
    pizzaInput.value = pizza.value;
    //console.log(pizza.value);
    const pizzaPriceDisplay = document.createElement("span");
    pizzaPriceDisplay.className = "priceList";
    pizzaPriceDisplay.textContent = pizza.price;
    //console.log(pizza.price);
    pizzaLabel.appendChild(pizzaInput);
    //console.log(pizzaLabel);
    pizzaLabel.appendChild(document.createTextNode(`${pizza.label} €`));
    pizzaLabel.appendChild(pizzaPriceDisplay);

    pizzaSelection.appendChild(pizzaLabel);

    pizzaSelection.appendChild(document.createElement("br"));
  });
}

createMenu();

function createExtraMenu() {
  for (var i = 0; i < extras.length; i++) {
    boxes = document.createElement("button");
    //boxes.type = "checkbox";
    listItems = document.createElement("li");
    boxes.innerHTML = extras[i];
    listItems.appendChild(boxes);
    extrasMenu.append(listItems);
  }
}

createExtraMenu();

function createPriceLists() {
  let priceArray = [];
  const pizzaChoice = pizzaSelection.querySelectorAll('input[name="pizza"]');
  pizzaChoice.forEach((input, index) => {
    priceArray[index] = Number(input.nextSibling.nextSibling.textContent);
  });
  return priceArray;
}

let priceArray = createPriceLists();
let small = priceArray.map((x) => x - 2);
let large = priceArray.map((x) => x + 2);

const radioContainer = document.getElementById("radioContainer");
radioContainer.addEventListener("input", function (event) {
  const selectedSize = event.target.id;

  let adjustedPrices;
  switch (selectedSize) {
    case "small":
      adjustedPrices = small;
      //console.log(adjustedPrices);
      break;
    case "med":
      adjustedPrices = priceArray;
      //console.log(adjustedPrices);
      break;
    case "large":
      adjustedPrices = large;
      //console.log(adjustedPrices);
      break;
  }
  const newPrice = document.querySelectorAll(".priceList");
  newPrice.forEach((span, index) => {
    span.textContent = adjustedPrices[index];
  });
});

let selectedExtras = [];

function createPizza() {
  const selectedPizza = document.querySelector(`input[name="pizza"]:checked`);
  buildPizza = document.getElementById("buildPizza");
  buildPizza.innerHTML = "";

  if (!selectedPizza) {
    alert("Please select a pizza.");
    return;
  }

  const selectedPizzaValue = selectedPizza.value;
  const selectedPizzaLabel = pizzas.find(
    (pizza) => pizza.value === selectedPizzaValue
  ).label;
  const selectedPizzaPrice = Number(
    selectedPizza.nextSibling.nextSibling.textContent
  );

  const extrasTotal = selectedExtras.length;
  const totalCost = selectedPizzaPrice + extrasTotal;

  const pizzaPreview = document.createElement("li");
  pizzaPreview.textContent = `${selectedPizzaLabel} - €${selectedPizzaPrice}
   + ${selectedExtras.length} extra(s) (€${extrasTotal}) = €${totalCost}`;
  buildPizza.appendChild(pizzaPreview);
}

pizzaSelection.addEventListener("change", function () {
  selectedExtras = [];
  updateExtrasDisplay();
  createPizza();
});

function updateExtrasDisplay() {
  const piz = document.getElementById("buildPizza");
  if (!piz) {
    console.error("buildPizza not found");
    return;
  }
  const extrasDisplay = document.createElement("li");
  extrasDisplay.innerHTML = `Extras: ${selectedExtras.join(", ") || "None"}`;
  piz.appendChild(extrasDisplay);
}

extrasMenu.addEventListener("click", (event) => {
  const extra = event.target.innerHTML;
  const selectedPizza = document.querySelector(`input[name="pizza"]:checked`);
  if (!selectedPizza) {
    alert("Please select a pizza before adding extras.");
    return;
  }

  if (selectedExtras.includes(extra)) {
    selectedExtras = selectedExtras.filter((e) => e !== extra);
  } else {
    selectedExtras.push(extra);
  }

  createPizza();
  updateExtrasDisplay();
});

function addToOrders() {
  ordersList = document.getElementById("orders");
  const notes = document.getElementById("notes").value;

  if (!buildPizza) {
    alert("Please create a pizza before adding to the order.");
    return;
  }

  const orderItem = buildPizza.firstChild;
  const addedNote = document.createElement("li");
  addedNote.textContent = orderItem.textContent;
  if (notes) {
    const noteText = document.createElement("span");
    noteText.textContent = ` (Note: ${notes})`;
    addedNote.appendChild(noteText);
  }
  ordersList.appendChild(addedNote);

  const pizzaPrice = parseFloat(orderItem.textContent.split("€").pop());
  total += pizzaPrice;
  totalWithoutDelivery += pizzaPrice;
  buildPizza.innerHTML = "";
  document.getElementById("notes").value = "";
  updateTotal();
}

delivery.addEventListener("change", addDelivery);

function addDelivery(check) {
  if (check.target.checked) {
    total = totalWithoutDelivery + 2;
    console.log(total);
  } else {
    total = totalWithoutDelivery;
    console.log(total);
  }
  updateTotal();
}

document.getElementById("add").addEventListener("click", addToOrders);

deliveryInfo.addEventListener("submit", function (event) {
  event.preventDefault();
  validateForm();
});

//orderButton.addEventListener("click", completeOrder);
orderButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (!validateDeliveryAddress()) {
    return;
  }
  completeOrder();
});

function validateForm() {
  const phoneNumber = document.getElementById("phoneNumber").value;

  if (phoneNumber && !phoneNumber.match(/^\d{4} \d{3} \d{4}$/)) {
    alert("Please enter  phone number in the provided format: XXXX XXX XXXX");
    return false;
  }

  console.log("Form validated successfully");
  return true;
}

function validateDeliveryAddress() {
  const delAddress = document.getElementById("delAddress").value;
  const delCheck = document.getElementById("del").checked;

  if (delCheck) {
    if (delAddress === "" || delAddress.trim() === "") {
      alert("You have selected delivery. Please enter a delivery address.");
      return false;
    }
  }

  return true;
}

function updateTotal() {
  document.getElementById("totalPrice").textContent = "Total: €" + total;
}

function completeOrder() {
  const ordersList = document.getElementById("orders");
  if (ordersList.children.length === 0) {
    alert(
      "Your order is empty. Please add some items before completing the order."
    );
    return;
  }

  alert(
    `Thank you for your order! Your total is €${total}.
    Your order will be ready soon.`
  );

  ordersList.innerHTML = "";
  total = 0;
  updateTotal();
}
