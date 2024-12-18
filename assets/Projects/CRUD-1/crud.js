// let title = document.getElementById("title");
// let price = document.getElementById("price");
// let taxes = document.getElementById("taxes");
// let ads = document.getElementById("ads");
// let discount = document.getElementById("dis");
// let total = document.getElementById("total");
// let count = document.getElementById("count");
// let category = document.getElementById("cat");
// let submit = document.getElementById("submit");


// console.log(title,price,taxes,ads,discount,total,count,category,submit)


function getTotal()
{
    if(price.value!= '' )
        {
            let result = ( +price.value + +taxes.value + +ads.value ) - +dis.value ;
            total.innerHTML = result;
            total.style.background = " green";
        }
        else{
            total.innerHTML = '';
            total.style.background = " red";
        } 
    
}

