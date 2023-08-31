let lable = document.getElementById('lable')
let shoppingcart = document.getElementById('shopping-cart')
console.log(shopeitemsData);
let basket = JSON.parse(localStorage.getItem("Data")) || [];
let calculation = ()=>{
    let cartamount = document.getElementById("number");
    cartamount.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y,0);
    
   }
   calculation();
   let generateItems = ()=>{
   if(basket.length !==0){
     return (shoppingcart.innerHTML = basket.map((x)=>{
        console.log(x);
        let {id, item}=x;
        let search = shopeitemsData.find((y)=>y.id===id) || [];
        return`
        <div class="cart-item">
        <img class="cartimg" width= "100" height="120" src= ${search.img}>
        <div class="details">
           <div class="cart-title">
           <h4 class="title-price">
           <p>${search.Name}</p>
           <p>${search.price} Rs</p>
           </h4>
           <i onclick="removeItem(${id})" class="bi bi-x"></i>
           </div>
            <div class="cart-buttons">
                <div class="buttons">
                <i onclick= "increment(${id})" class="bi bi-plus"></i>
                <div id = ${id} class="quantity"> ${item}</div>
                <i onclick= "decrement(${id})" class="bi bi-dash"></i>
                </div>
           </div>
          <h3>${item * search.price} Rs</h3>
          
        </div>
        </div>
        `;
     }).join(""));
   }
   else{
    shoppingcart.innerHTML = ``;
    lable.innerHTML = `
    <h2> Crat Is Empty </h2>
    <a href="store.html">
    <button class="homebutton"> Back to home </button>
    </a>
    `;
   }
   }
   generateItems();

   let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    if(search === undefined){
        basket.push({
            id : selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
   
   generateItems();
    update(selectedItem.id);
    localStorage.setItem("Data", JSON.stringify(basket));
}
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined)return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
   
   basket = basket.filter((x)=>x.item!==0) 
   generateItems();
localStorage.setItem("Data", JSON.stringify(basket));
};
let update = (id) =>{
    let search = basket.find((x)=>x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalamount();
};
let removeItem=(id)=>{
    let selectedItem=id;
    basket=basket.filter((x)=>x.id !== selectedItem.id);
    generateItems();
    localStorage.setItem("Data", JSON.stringify(basket));
    totalamount();
    calculation();
};
let clearcart =()=>{
    basket=[];
    generateItems();
    localStorage.setItem("Data", JSON.stringify(basket));
    calculation();
}
let totalamount =()=>{
    if(basket.length !==0 ){
        let amount = basket.map((x)=>{
            let {item, id}=x
            let search = shopeitemsData.find((y)=>y.id===id) || [];
            return item * search.price
        }) .reduce((x,y)=> x+y,0)
        lable.innerHTML = `
         <h2>Total Bill : ${amount} Rs</h2>
         <button class="chk">Checkout</button>
         <button onclick="clearcart()" class="remove">Clear Cart</button>
        `
    }
    else return;

};
totalamount();