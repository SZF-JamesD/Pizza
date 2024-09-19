/* total price - done
dynamic price updates upon selection - done
function to summarize the order -just need to add extras
simple validation (min one pizza)
after "order" a summary is displayed*/

/*error handling - all required fields are filled
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
var priceName = "prices";
var order = document.getElementById("order");
var dis = document.getElementById("dis");
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
sizeChoice.addEventListener("change", function (event) {
  selectedSize = event.target.value;
  console.log(selectedSize);
  switch (selectedSize) {
    case "medium":
      prices.innerHTML = "\u20ac" + mediumPrices;
      prices = mediumPrices;
      priceName = "Medium";
      break;
    case "large":
      prices.innerHTML = "\u20ac" + largePrices;
      prices = largePrices;
      priceName = "Large";
      break;
    default:
      prices.innerHTML = "\u20ac" + smallPrices;
      prices = smallPrices;
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
  if (selectedSize === "disabled") {
    alert("Please select a size");
    return;
  }
  total += prices;
  orderSummary(event.target.id);
  price.innerHTML = "\u20ac" + total;
});

function orderValidation() {}

function summary() {}
