const balance=document.getElementById("balance");
const money_plus=document.getElementById("money-add");
const money_minus=document.getElementById("money-minus");
const list=document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("amount");

//  adding transaction in the DOM
let transactions=[
    { id: 1, text: "Flower", amount: -20 },
];

function addTransactionDOM(transaction){
    const sign=transaction.amount<0?"-":"+";
    const item=document.createElement("li");
    const class_str="d-flex position-relative justify-content-between shadow-sm p-1 mb-2 bg-white rounded w-50";
    item.classList.add(transaction.amount<0 ?`minus ${class_str}`:`add ${class_str}`);
    // console.log(item.className);
    // item.className+=" d-flex position-relative justify-content-between shadow-sm p-1 mb-2 bg-white rounded w-50";
    item.innerHTML=`
    ${transaction.text}<span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn mb-1 me-2" onclick="">x</button>
    `;
    list.appendChild(item);
}




// Update Values of balance and income and expense
function updateValues(){
    const amount=transactions.map(transaction => transaction.amount);
    const total=amount.reduce((acc,item)=> (acc+=item),0).toFixed(2);
    const income=amount.filter(item => item > 0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    const expense=(amount.filter(item => item < 0).reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);
    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
}


function addTransaction(e)
{
    // e.preventdefault();
    if(text.value.trim()==""|| amount.value.trim=="")
    {
        alert("Please Enter Text and Value");
    }
    else
    {
        const transaction={
            id:generateId(),
            text:text.value,
            amount:+amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();

        
        text.value="";
        amount.value="";
    }
}

function generateId(){
    return Math.floor(Math.random()*100);
}

// INIT FUNCTION
function Init(){
    list.innnerHTML="";
    transactions.forEach(addTransactionDOM)
    updateValues();
}


Init();
// console.log(form.addEventListener("submit",addTransaction));
addTransaction();

