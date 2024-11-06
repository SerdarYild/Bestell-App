let basketDish = [];
let basketPrice = [];
let amount = [];
let totalAmount = [];

function render() {
    renderMenu();
    showCard();
}

function renderMenu() {
    document.getElementById('theDishes').innerHTML = '';
    let keys = Object.keys(ourDishes);

    loadCategory();

    for (let i = 0; i < keys.length; i++) {
        showTotalMenuTemplate(i);
        displayMeals(i, keys);
    }
}

function showEmptyCard() {
    document.getElementById('orderMenu').innerHTML = /*html*/`
    <p>Bestellung hinzufügen.</p>
    `;
    document.getElementById('mobileOrder').innerHTML = /*html*/`
    <p>Bestellung hinzufügen.</p>
    `;
}

function showCard() {
    document.getElementById('orderMenu').innerHTML = '';
    totalAmount = [];

    if (basketDish.length < 1) {
        showEmptyCard();
        
    } else {
        for (let i = 0; i < basketDish.length; i++) {
        const elementFood = basketDish[i];
        let elemenPrice = basketPrice[i].toFixed(2);
        const elementAmount = amount[i];
        let overallResult = elementAmount * elemenPrice;
        let result = overallResult.toFixed(2);

        getDishTemplate(elementFood, elemenPrice, elementAmount, result, i);
        totalAmount.push(overallResult);
        }
        displayResults();
    }
};

function displayMeals(index, keys) {
    let id = keys[index];
    let actuallMeal = ourDishes[keys[index]];
    for (let i = 0; i < actuallMeal.length; i++) {
    let meal = actuallMeal[i];

    showDishTemplate(meal, i, index, id);
    }
}

function loadCategory() {
    let menuList = document.getElementById('menuList');
    menuList.innerHTML = '';

    let keys = Object.keys(ourDishes);
    for (let i = 0; i < keys.length; i++) {
        let menu = keys[i];
        categoryTemplate(menu, menuList);
    }
}
  
  function addDishToOrder(i, index) {
      let key = Object.keys(ourDishes);
  
      let foodToCard = ourDishes[key[index]][i].food;
      let priceToCard = ourDishes[key[index]][i].price;
  
      if (basketDish.includes(foodToCard)) {
          let i = basketDish.indexOf(foodToCard);
          amount[i]++;
      } else {
      basketDish.push(foodToCard);
      basketPrice.push(priceToCard);
      amount.push(1);    
      }
      showCard();
  }
  
  function displayResults() {
    let overallResult = document.getElementById('totalSum');
    let overallResultMobil = document.getElementById('mobileOrder');

    if (totalAmount.length < 1) {
        overallResult.innerHTML = '';
    } else {
        let result = totalAmount.reduce((a, b) => a + b);
        sumTemplate(result, overallResult, overallResultMobil);
    }
}

function updateOrder(index) {
    amount[index]++;
    showCard();
}

function removeItemOrder(index) {
    if (amount[index] >= 2) {
        amount[index]--;
    } else {
        basketDish.splice(index, 1);
        basketPrice.splice(index, 1);
        amount.splice(index, 1);
    }

    if (amount.length < 1) {
        showEmptyCard();
    } else {
        showCard();
    }   
}

function deleteFromOrder(index) {
    basketDish.splice(index, 1);
    basketPrice.splice(index, 1);
    amount.splice(index, 1);
    showCard();
}

function openBasket() {
    document.getElementById('basketOrders').classList.toggle('display_none');
    document.getElementById('menuWrapper').classList.toggle('display_none');
    document.getElementById('mobileBasket').innerHTML = /*html*/`
        <a id="openOrder" class="basket-open-button" onclick="closeBasket()" href="#">Bestellung schliessen</a>
        <div id="mobileOrder" class="mobil-order display_none"></div>
    `;
}

function closeBasket() {
    document.getElementById('basketOrders').classList.toggle('display_none');
    document.getElementById('menuWrapper').classList.toggle('display_none');
    document.getElementById('mobileBasket').innerHTML = /*html*/`
        <a id="openOrder" class="basket-open-button" onclick="openBasket()" href="#">Bestellung öffnen</a>
        <div id="mobileOrder" class="mobil-order"></div>
    `;
    if (basketDish < 1) {
        showEmptyCard();
    } else {
        displayResults();
    }
}