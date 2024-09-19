/* 
function to summarize the order -just need to add extras
after "order" a summary is displayed*/
//click pizza, brings up extras menu, then all together into shopping cart
/*error handling - all required fields are filled -done?
feedback of invalid inputs or missing selections*/

/*confirmation message when order is placed
visually highlight selected options*/
var price = document.getElementById("price"); //price display
var sizeChoice = document.getElementById("size"); //dropdown for size selection
var small = document.getElementById("small"); //prices for small
var med = document.getElementById("medium"); //prices for medium
var large = document.getElementById("large"); //prices for large
var prices = document.getElementById("pizzaPrice");
const pizzaContainer = document.getElementById("pizzaContainer");
var smallPrices = 5; //\u20ac
var mediumPrices = 8;
var largePrices = 12;
var total = 0;
var summaryList = document.getElementById("summaryList");
var priceName = "";

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

extrasMenu = document.getElementById("extraMenu");
//make extra menu
for (var i = 0; i < extras.length; i++) {
  boxes = document.createElement("input");
  boxes.type = "checkbox";
  listItems = document.createElement("li");
  listItems.innerHTML = extras[i];
  listItems.appendChild(boxes);
  extrasMenu.append(listItems);
}

//price updater
var selectedSize = "disabled";
var priceChange = prices;
sizeChoice.addEventListener("change", function (event) {
  selectedSize = event.target.value;
  //console.log(selectedSize);
  switch (selectedSize) {
    case "medium":
      prices.innerHTML = "\u20ac" + mediumPrices;
      priceChange = mediumPrices;
      priceName = "Medium";
      break;
    case "large":
      prices.innerHTML = "\u20ac" + largePrices;
      priceChange = largePrices;
      priceName = "Large";
      break;
    default:
      prices.innerHTML = "\u20ac" + smallPrices;
      priceChange = smallPrices;
      priceName = "Small";
      break;
  }
});
//on page order summary
function orderSummary(pizzaName) {
  order = document.createElement("li");
  //console.log(pizzaName);
  order.textContent = priceName + " " + pizzaName;

  summaryList.append(order);
}

//price total
pizzaContainer.addEventListener("click", (event) => {
  const isButton = event.target.nodeName === "BUTTON";
  if (!isButton) {
    return;
  }
  //console.log(event.target.id);
  else if (selectedSize === "disabled") {
    alert("Please select a size");
    return;
  }
  //console.log(priceChange);

  total += priceChange;
  orderSummary(event.target.id);
  price.innerHTML = "\u20ac" + total;
});

var add = document.getElementById("add");
add.addEventListener("click", orderValidation);

function orderValidation() {
  let listLenght = document
    .getElementById("summaryList")
    .getElementsByTagName("li").length;
  //console.log(listLenght);

  if (listLenght === 0) {
    alert("Please put at least one Pizza in the basket");
  }
}
//make order button work and either make a popup or redirect to new page with full order and price

function summary() {}

//get extras into the pizza
