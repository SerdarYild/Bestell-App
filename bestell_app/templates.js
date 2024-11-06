function showDishTemplate(meal, i, index, keys) {
    let menuId = keys.replace(/\s+/g, '');
    return document.getElementById('menu' + menuId).innerHTML += /*html*/`
        <div class="dining-area">
            <div class="food-contents">
                <div class="ingredients">
                    <b>${meal.food}</b>
                    <p class="ingredients-text">${meal.discription}</p>
                </div>
            </div>
            <div class="dishprice">
                <b>${meal.price.toFixed(2)} €</b>     
                <div class="button-Container">    
                    <button class="add-to-Card-Button" id="moreDish${i}" onclick="addDishToOrder(${i}, ${index})">+</button>
                </div>
            </div>
        </div>
    `;
}

function getDishTemplate(elementFood, elementprice, elementAmount, result, i) {

    document.getElementById('orderMenu').innerHTML += /*html*/`
        <div class="card-text-container">   
            <b>${elementFood}</b>
            <div class="basket-button-container">
                <div class="amounts">
                    <div class="card-buttons" id="feDish${i}" onclick="removeItemOrder(${i})"><b>-</b></div>
                        <p>${elementAmount}</p>
                        <div class="card-buttons" id="moreDish${i}" onclick="updateOrder(${i})"><b>+</b></div>
                </div>
                <p>${elementprice} €</p>
                <p>=  ${result} €</p>
                <button class="btn-delete" onclick="deleteFromOrder(${i})"> X</button>
            </div>
        </div>      
    `;
}

function showTotalMenuTemplate(i) {
    let menus = Object.keys(ourDishes)[i];
    document.getElementById('theDishes').innerHTML += /*html*/`
        <div class="menus">
            <h1 id="title${menus}" class="menu-title">${menus}</h1>
            <div id="menu${menus}" class="food-container"></div>
        </div>
    `;
}

function sumTemplate(result, overallResult, overallResultMobil) {
    let orderSum = result.toFixed(2);
    overallResult.innerHTML = /*html*/`
        <div class="totalamount-field"> 
            <p>Gesamtbetrag</p><b> ${orderSum} €</b>
        </div>
        <a href="ordered.html" class="order-button">Bestellen</a>
    `;

    overallResultMobil.innerHTML = /*html*/`
    <p>Gesamtbetrag</p><b> ${orderSum} €</b>
    `;
}

function categoryTemplate(menus, menuList) {
    menuList.innerHTML += /*html*/`
        <a class="menu_title" href="#title${menus}">${menus}</a>
    `;
}