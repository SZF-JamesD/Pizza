/* 
function to summarize the order -just need to add extras
after "order" a summary is displayed*/
//click pizza, brings up extras menu, then all together into shopping cart
/*error handling - all required fields are filled -done?
feedback of invalid inputs or missing selections*/
//get extras into the pizza
/*confirmation message when order is placed
visually highlight selected options*/
var price = document.getElementById("price"); //price display
var sizeChoice = document.getElementById("size"); //dropdown for size selection
/*var small = document.getElementById("small"); //prices for small
var med = document.getElementById("medium"); //prices for medium
var large = document.getElementById("large"); //prices for large*/
var prices = document.getElementById("pizzaPrice");
const pizzaContainer = document.getElementById("pizzaContainer");
var priceList = document.getElementsByClassName("priceList");
/*var smallPrices = 5; //\u20ac
var mediumPrices = 8;
var largePrices = 12;*/
var total = 0;
var buildPizza = document.getElementById("buildPizza");
var shoppingBasket = document.getElementById("shoppingBasket");
var priceName = "";

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

//make extra menu
for (var i = 0; i < extras.length; i++) {
  boxes = document.createElement("button");
  //boxes.type = "checkbox";
  listItems = document.createElement("li");
  boxes.innerHTML = extras[i];
  listItems.appendChild(boxes);
  extrasMenu.append(listItems);
}

//price updater
/*var selectedSize = "disabled";
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
});*/
function createVariables() {
  priceArray = [];
  for (var a = 0; a < priceList.length; a++) {
    p = document.getElementById("price" + [a]);
    priceArray[a] = Number(p.innerHTML);
  }
  return priceArray;
}
var priceArray = createVariables();
var small = priceArray.map((x) => x);
var large = priceArray.map((x) => x);
for (i = 0; i < priceArray.length; i++) {
  small[i] -= 2;
}
for (i = 0; i < priceArray.length; i++) {
  large[i] += 2;
}
const radioContainer = document.getElementById("radioContainer");
radioContainer.addEventListener("input", function (event) {
  selectedSize = event.target.value;

  var priceArray2 = priceArray;
  console.log(selectedSize);

  switch (selectedSize) {
    case "Small":
      priceList = small;
  }
});

//create the pizza
function createPizza(pizzaName) {
  const extraContainer = document.getElementById("extraContainer");
  pizza = document.createElement("li");

  pizza.textContent = priceName + " " + pizzaName;
  console.log(pizza.textContent.length);
  if (pizza.textContent.length < 1) {
    extraContainer.addEventListener("click", (event) => {
      const isButton = event.target.nodeName === "BUTTON";
      if (!isButton) {
        return;
      }
      //console.log(event.target.id);
      else if (selectedSize === "disabled") {
        alert("Please select a size");
        return;
      }
    });
    buildPizza.append(order);
  }

  function shoppingBasket() {}
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
    //if checked, open extras menu that's all buttons.
    //console.log(priceChange);
    /*either eventlistener to open extras menu on click, 
  and new variable for extraprices, or redo first eventlistener.*/

    total += priceChange;
    createPizza(event.target.id);
    price.innerHTML = "\u20ac" + total;
  });

  var completeOrder = document.getElementById("order");
  completeOrder.addEventListener("click", orderValidation);

  function orderValidation() {
    let listLenght = document
      .getElementById("shoppingList")
      .getElementsByTagName("li").length;
    //console.log(listLenght);

    if (listLenght === 0) {
      alert("Please put at least one Pizza in the basket");
    }
  }
}
//make order button work and either make a popup or redirect to new page with full order and price

//function summary() {}
