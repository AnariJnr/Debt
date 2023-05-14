// ****** select items **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("groceryID");
const groceryPrice = document.getElementById("grocery-price");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const viewItems = document.getElementById("view-items");





// ****** event listeners **********
form.addEventListener("submit",addItem);
clearBtn.addEventListener("click",clearItems);
window.addEventListener("DOMContentLoaded",setUpItems);

// ****** Functions  ***********

function addItem(e){
  e.preventDefault();
  const nameValue = grocery.value;
  const amountValue = groceryPrice.value;
  const viewItemsValue = viewItems.value;
  const id = new Date().getTime().toString();
  if(nameValue !=="" && amountValue !=="" && viewItemsValue){
  
    const element = document.createElement('article');
    //  add class
    element.classList.add("grocery-item");
    // add attribute
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    // add html
    element.innerHTML = ` <p class="title">${nameValue}</p>
    <p class="title amount-owed">${-amountValue} Naira</p>
    <input type="number" id="paid-amount" class="grocery-style2" placeholder="amount paid" />
    <div class="btn-container">
      <button type="button" class="addition-btn">
        <i class="fas fa-edit">add</i>
      </button>
      <button type="button" class="subtraction-btn">
        <i class="fas fa-edit">subtract</i>
      </button>
      <button type="button" class="viewItemsBtn">
                  View items
      </button>
      <p class="viewItems" >${viewItemsValue}</p>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`
  
     // delete btn
     const deleteBtns = element.querySelector(".delete-btn");
     deleteBtns.addEventListener("click",deleteItems);
     // add button
     const addBtn = element.querySelector(".addition-btn");
     addBtn.addEventListener("click",addition);
  
    //  subtraction button
    const subtractBtn = element.querySelector(".subtraction-btn");
     subtractBtn.addEventListener("click",subtraction);
     
     // set color on this
     const amountOwed = element.querySelector(".amount-owed");
     setColor(amountOwed);
  
    // view items Btn 
      const viewItemsBtn = element.querySelector(".viewItemsBtn"); 
      viewItemsBtn.addEventListener("click",viewCreditItems); 
    // append child
    list.appendChild(element);

  // display alert
  displayAlert("Name added to the list", "success");
  container.classList.add("show-container");
  // add to local storage
  addToLocalStorage(id,nameValue,amountValue,viewItemsValue);
  
 
  
  // set back to default
  setBackToDefault();
  }else{
      displayAlert("Enter values","danger");
  }
}

// display alert
function displayAlert(text,action){
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(function(){
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  },1000);

}
// delete fuc
function deleteItems(e){
  const article = e.currentTarget.parentElement.parentElement;
  const id = article.dataset.id;
       list.removeChild(article);
       if(list.children.length===0){
         container.classList.remove("show-container");
       }
       displayAlert("Name Deleted","danger");
       setBackToDefault();
    //  remove from local storage
     removeFromLocalStorage(id);
}

// add fuc

function addition(e){
  const element = e.currentTarget.parentElement.parentElement.children[1];

  const paidAmount =  e.currentTarget.parentElement.parentElement.children[2];
   // get element id
   const id =  e.currentTarget.parentElement.parentElement.dataset.id;
   let items = getLocalStorage();
  //  console.log(parseInt(element.textContent));
  // console.log(parseInt(paidAmount.value));
  if(paidAmount.value){
    element.textContent = parseInt(element.textContent) + parseInt(paidAmount.value);
    paidAmount.value = ""
    items = items.find(function(val){
      if(val.id === id){
        // console.log(val);
       val.amountValue = element.textContent;
      //  console.log(val);
       
    localStorage.setItem("list",JSON.stringify(items));
      }
  });
    displayAlert("Money added", "success");
  }else{
    displayAlert("Empty Values","danger");
  }

  // set color
  setColor(element);

  setBackToDefault();
}

// subtract fuc
function subtraction(e){
  const element = e.currentTarget.parentElement.parentElement.children[1];

  const paidAmount =  e.currentTarget.parentElement.parentElement.children[2];

  // get element id
  const id =  e.currentTarget.parentElement.parentElement.dataset.id;
  let items = getLocalStorage();
  
 
  if(paidAmount.value){
    element.textContent = parseInt(element.textContent) - parseInt(paidAmount.value);
    paidAmount.value = ""
    items = items.find(function(val){
      if(val.id === id){
        // console.log(val);
       val.amountValue = element.textContent;
      //  console.log(val);
       
    localStorage.setItem("list",JSON.stringify(items));
      }
  });
    displayAlert("Money subtracted", "danger");
  }else{
    displayAlert("Empty Values","danger");
  }

  // set color
  setColor(element);

  setBackToDefault();
}

 // set back to default
function setBackToDefault(){
  grocery.value ="";
  groceryPrice.value = "";
  viewItems.value = ""

}

// clear items
function clearItems(){
  const items = document.querySelectorAll(".grocery-item");
  if(items.length > 0){
    items.forEach(function(item){
      list.removeChild(item);
    });
    
  }
  container.classList.remove("show-container");
  displayAlert("Names Cleared","success");
  setBackToDefault();
  // clear from local storage
  localStorage.removeItem("list");
}

//view items fuc
function viewCreditItems(e){
  const viewItems = e.target.nextElementSibling;
  // console.log(viewItems);
  viewItems.classList.add("show-container");
  setTimeout(function(){
    viewItems.classList.remove("show-container");
  },3000);
  // console.log(allBtns);

}

// set color
function setColor(element){
  if(element.textContent.includes("-")){
    element.style.background ="hsl(12, 86%, 81%)";
  }else{
    element.style.background ="hsl(99.69deg 86% 81%)";
  }
}


// ******Local Storage ****

function addToLocalStorage(id,nameValue,amountValue,viewItemsValue){
   amountValue = `-${amountValue}`;
    let grocery = {id,nameValue,amountValue,viewItemsValue}
   let items = getLocalStorage();
   items.push(grocery);
   localStorage.setItem("list",JSON.stringify(items));
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
       if(item.id!==id){
        return item;
       }
    });
    localStorage.setItem("list",JSON.stringify(items));
    
}

function getLocalStorage(){
 return localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")):[];
}

function setUpItems(){

  alert.textContent = "Please view with desktop or PC as this site is not yet optimised for mobile.","danger";
  
  setTimeout(function(){
    alert.textContent = "";
  },10000);
  let items = getLocalStorage();
  if(items.length>0){
      items.forEach(function(item){
        createListItem(item.id,item.nameValue,item.amountValue,item.viewItemsValue);
      });
      container.classList.add("show-container");
  }

}

function createListItem(id,nameValue,amountValue,viewItemsValue){
 
  const element = document.createElement('article');
  //  add class
  element.classList.add("grocery-item");
  // add attribute
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  // add html
  element.innerHTML = ` <p class="title">${nameValue}</p>
  <p class="title amount-owed">${amountValue} Naira</p>
  <input type="number" id="paid-amount" class="grocery-style2" placeholder="amount paid" />
  <div class="btn-container">
    <button type="button" class="addition-btn">
      <i class="fas fa-edit">add</i>
    </button>
    <button type="button" class="subtraction-btn">
      <i class="fas fa-edit">subtract</i>
    </button>
    <button type="button" class="viewItemsBtn">
                View items
    </button>
    <p class="viewItems" >${viewItemsValue}</p>
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`

   // delete btn
   const deleteBtns = element.querySelector(".delete-btn");
   deleteBtns.addEventListener("click",deleteItems);
   // add button
   const addBtn = element.querySelector(".addition-btn");
   addBtn.addEventListener("click",addition);

  //  subtraction button
  const subtractBtn = element.querySelector(".subtraction-btn");
   subtractBtn.addEventListener("click",subtraction);

   // set color on this
   const amountOwed = element.querySelector(".amount-owed");
   setColor(amountOwed);

  // view items Btn 
    const viewItemsBtn = element.querySelector(".viewItemsBtn"); 
    viewItemsBtn.addEventListener("click",viewCreditItems); 
  // append child
  list.appendChild(element);
  
}

// localStorage.setItem("orange",JSON.stringify(["items","items2"]));
// const getOrange = JSON.parse(localStorage.getItem("orange"));
// console.log(getOrange);
// localStorage.removeItem("orange");

// let testItem = getLocalStorage();
// testItem =testItem.filter(function(item){
//   console.log(item.id);
// })

