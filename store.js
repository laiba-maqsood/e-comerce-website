let shope = document.getElementById("shope")

let basket = JSON.parse(localStorage.getItem("Data")) || [];
let generateShope = () => {
    return ( shope.innerHTML = shopeitemsData.map((x)=>{
        let {id, price, Name, des, img} = x;
        let search = basket.find((x)=> x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
        <img src=${img} alt="" width="246" height="250" />
        <div class="details">
        <h3>${Name}</h3>
        <p>Lorem ipsum dolor sit amet consectetur hjfhdj uugdye.</p>
        <div class="pricing">
        <h3>${price} Rs</h3>
        <div class="buttons">
          <i onclick= "increment(${id})" class="bi bi-plus"></i>
          <div id = ${id} class="quantity"> ${search.item ===undefined ? 0 : search.item }</div>
          <i onclick= "decrement(${id})" class="bi bi-dash"></i>
        </div>
        </div>
    </div>
      </div> 
        `;
    }).join(""));
};

generateShope();

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
   localStorage.setItem("Data", JSON.stringify(basket));
   // console.log(basket);
    update(selectedItem.id);
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
   // console.log(basket); 
   basket = basket.filter((x)=>x.item!==0) 
localStorage.setItem("Data", JSON.stringify(basket));
}
let update = (id) =>{
    let search = basket.find((x)=>x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = ()=>{
 let cartamount = document.getElementById("number");
 cartamount.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y,0)
 
}
calculation();