// html elementleri
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear.btn");


let editElement; // düzenleme yapılan ögeyi temsil eder
let editFlag = false // düzenleme modunda olup olmadığı
let editID="" // benzersiz ıd

//form gönderildiğinde add foksiyonunu cağır
form.addEventListener("submit", addItem);

clearBtn.addEventListener("click",clearItems)
window.addEventListener("DOMContentLoaded",setupItems)
//! functions
function addItem(e){
    e.preventDefault();
    const value = grocery.value;// inputun giriş değerini al
    const id= new Date().getTime().toString();

    if(value !== "" && !editFlag){
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value=id;
        element.setAttributeNode(attr)
        element.classList.add("grocery-item"); 
        
       element.innerHTML=` 
       <p class="title">${value}</p>
       <div class="btn-container">
           <button class="edit-btn" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
           <button class="delete-btn" type="button"><i class="fa-sharp fa-solid fa-trash"></i>
           </button>
       </div>`;

        const deleteBtn = element.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", deleteItem)

        const editBtn = element.querySelector(".edit-btn")
        editBtn.addEventListener("click",editItem)  

       list.appendChild(element);
       displayAlert("Başarıyla Eklendi","success");

       container.classList.add("show-container");
       addToLocalStorage(id , value);
       setBackToDefault();
     
    }else if ( value !== "" && editFlag){
       editElement.innerHTML = value
       displayAlert("Değer değiştirildi","succes")
       editLocalStorage(editID,value)
       setBackToDefault()
    }else{
       displayAlert("Lütfen bir değer giriniz","danger") 
    }
}

function displayAlert(text,action){
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(function(){
  alert.textContent=""
  alert.classList.remove(`alert-${action}`);
  },2000);
}

function setBackToDefault(){
   grocery.value="";
   editFlag=false;
   editID="";
   submitBtn.textContent="submit";
}

function deleteItem(e){
 const element = e.currentTarget.parentElement.parentElement
 const id = element.dataset.id
 list.removeChild(element)

if(list.children.length == 0){
    container.classList.remove("show-container")
}
displayAlert("Eleman kaldırıldı","danger")

removeFromLocalStorage(id)
}

function editItem(e){
   const element= e.currentTarget.parentElement.parentElement 
   editElement =e.currentTarget.parentElement.previousElementSibling
   grocery.value=editElement.innerHTML
   editFlag=true
   editID= element.dataset.id
   submitBtn.textContent="edit"
}


function clearItems(){
    const items = document.querySelectorAll(".grocery-item")
    if(items.length > 0){
        items.forEach(function(item){
         list.removeChild(item)  
        })

        
    }
    container.classList.remove("show-container")
    setBackToDefault()
}







function addToLocalStorage(id,value){
 const grocery ={id ,value} 
 let items = getLocalStorage()
 items.push(grocery)
 localStorage.setItem("list",JSON.stringify(items))
}

function getLocalStorage(){
  return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []
}
 function removeFromLocalStorage(id){
    let items = getLocalStorage()

    items = items.filter(function(item){
        if (item.id !==id){
          return item
        }
    })
 }

function editLocalStorage(id,value){

}

function setupItems(){

    let items = getLocalStorage()
}
