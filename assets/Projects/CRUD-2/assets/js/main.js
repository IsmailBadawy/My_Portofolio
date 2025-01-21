// Variables
{
    var type = document.getElementById('type');
    var price = document.getElementById("price");
    var taxes = document.getElementById("taxes");
    var ads = document.getElementById("ads");
    var dis = document.getElementById("discount");
    var total = document.getElementById("total");
    var count = document.getElementById("count");
    var category = document.getElementById('category');
    var creatBtn = document.getElementById("creatBtn");
    var updateBtn = document.getElementById("updateBtn");
    var deletAllBtn = document.getElementById("deletAllBtn");
    var searchbox = document.querySelector(".searchbox");
    var searchBtn = document.getElementById("search");
    var searchType = document.getElementById("searchType");
    var searchCategory = document.getElementById("searchCategory");
    var searchMood = 'Type';
    var tbody = document.getElementById("tbody");
    var ArrayObject = [];
    var index;
}

// Mood Function
mood.addEventListener('click', () => {
    let mood = document.getElementById("mood");
    let head = document.querySelector(".head");
    let line = document.querySelector(".line");
    let table = document.querySelector("table");

    function changePlaceholderColor(backgroundColor) {
        let style = document.createElement("style");
        if (backgroundColor === "black") {
            style.innerHTML = `
                #price::placeholder,
                #taxes::placeholder,
                #ads::placeholder,
                #count::placeholder,
                #discount::placeholder {
                    color: white !important;
                }
            `;
        } else {
            style.innerHTML = `
                #price::placeholder,
                #taxes::placeholder,
                #ads::placeholder,
                #count::placeholder,
                #discount::placeholder {
                    color: black !important;
                }
            `;
        }
        document.head.appendChild(style);
    }
    if (mood.innerHTML === "Day Mood") {
        document.body.style.cssText = `background-color: var(--whiteColor);`;
        mood.innerHTML = "Night Mood";
        mood.style.cssText = `color: var(--whiteColor); background-color: var(--darkColor);`;
        head.style.cssText = `color: var(--darkColor);`;
        line.style.cssText = `background: var(--darkColor);`;
        table.classList.remove('table-dark');

        let inputs = [type, price, taxes, ads, dis, count, category];
        inputs.forEach(input => {
            input.classList.remove('bg-black', 'text-white');
        });
        changePlaceholderColor("white");
    } else {
        document.body.style.cssText = `background-color: var(--darkColor);`;
        mood.innerHTML = "Day Mood";
        mood.style.cssText = `color: var(--darkColor); background-color: var(--whiteColor);`;
        line.style.cssText = `background: var(--whiteColor);`;
        head.style.cssText = `color: var(--whiteColor);`;
        table.classList.add('table-dark');
        let inputs = [type, price, taxes, ads, dis, count, category];
        inputs.forEach(input => {
            input.classList.add('bg-black', 'text-white');
        });
        changePlaceholderColor("black");
    }
});

// Add Function
creatBtn.onclick = add;
function add() {
    let newObject = {
        type: type.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: dis.value,
        count: count.value,
        category: category.value,
        total: total.innerHTML,
    };
    if (newObject.count > 1) {
        for (let i = 0; i < newObject.count; i++) {
            ArrayObject.push({ ...newObject });
        }
    } else {
        ArrayObject.push(newObject);
    }
    localStorage.setItem('project', JSON.stringify(ArrayObject));
    clear();
    showData();
}

// Calculate Total
price.oninput = getTotal;
taxes.oninput = getTotal;
ads.oninput = getTotal;
dis.oninput = getTotal;
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +dis.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    } else {
        total.style.backgroundColor = '';
        total.innerHTML = "";
    }
}

// Clear Function 
function clear() {
    type.value = 'Type';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    dis.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = 'Category';
}

// Show Data Function 
function showData() {
    tbody.innerHTML = '';
    for (let i = 0; i < ArrayObject.length; i++) {
        let element = `
            <tr class="text-capitalize text-center">
                <td>${i + 1}</td>
                <td>${ArrayObject[i].type}</td>
                <td>${ArrayObject[i].price}</td>
                <td>${ArrayObject[i].taxes}</td>
                <td>${ArrayObject[i].ads}</td>
                <td>${ArrayObject[i].discount}</td>
                <td>${ArrayObject[i].total}</td>
                <td>${ArrayObject[i].category}</td>
                <td><button onclick="getData(${i})" class="btn btn-info">Update</button></td>
                <td><button onclick="deleteItem(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`;
        tbody.innerHTML += element;

        if (ArrayObject.length > 0) {
            deletAllBtn.classList.remove('d-none');
            searchbox.classList.remove('d-none');
            deletAllBtn.innerHTML = `Delete All (${i + 1})`;
        }
    }
    localStorage.setItem("project", JSON.stringify(ArrayObject));
    getTotal();
}

// Delete Item Function 
function deleteItem(i) {
    ArrayObject.splice(i, 1);
    localStorage.setItem("project", JSON.stringify(ArrayObject));
    showData();
}

// Delete All Data Function
deletAllBtn.addEventListener('click', deletAll);
function deletAll() {
    ArrayObject.splice(0);
    deletAllBtn.classList.add('d-none');
    localStorage.setItem("project", JSON.stringify(ArrayObject));
    showData();
}

// Get Values To Update
function getData(i) {
    type.value = ArrayObject[i].type;
    price.value = ArrayObject[i].price;
    taxes.value = ArrayObject[i].taxes;
    ads.value = ArrayObject[i].ads;
    dis.value = ArrayObject[i].discount;
    category.value = ArrayObject[i].category;
    total.innerHTML = ArrayObject[i].total;

    creatBtn.classList.add("d-none");
    count.classList.add('d-none');
    updateBtn.classList.remove("d-none");
    index = i;
    scroll({ top: 0, behavior: "smooth" });
    showData();
}

// Update Data Function
updateBtn.addEventListener('click', updateData);
function updateData() {
    ArrayObject[index].type = type.value;
    ArrayObject[index].price = price.value;
    ArrayObject[index].taxes = taxes.value;
    ArrayObject[index].ads = ads.value;
    ArrayObject[index].discount = dis.value;
    ArrayObject[index].category = category.value;
    ArrayObject[index].total = total.innerHTML;

    creatBtn.classList.remove("d-none");
    count.classList.remove('d-none');
    updateBtn.classList.add("d-none");
    localStorage.setItem("project", JSON.stringify(ArrayObject));

    clear();
    getTotal();
    showData();
}

// Get Search Mood Function
function getSearchMood(id) {
    if (id === 'searchType') {
        searchMood = 'Type';
        searchBtn.placeholder = 'Search By Type';
    } else {
        searchMood = 'Category';
        searchBtn.placeholder = 'Search By Category';
    }
    searchBtn.focus();
}

// Search Function
searchBtn.onkeyup = search;
function search() {
    let value = searchBtn.value.toLowerCase().trim(); // تحويل القيمة إلى أحرف صغيرة وإزالة المسافات الزائدة
    let element = ''; // لعرض العناصر
    tbody.innerHTML = ''; // تفريغ الجدول لعرض النتائج الجديدة

    // إذا كان مربع البحث فارغًا، عرض كل العناصر
    if (value === '') {
        showData();
        return;
    }

    // البحث حسب الحالة الحالية (Type أو Category)
    for (let i = 0; i < ArrayObject.length; i++) {
        let searchField = searchMood === 'Type' ? ArrayObject[i].type : ArrayObject[i].category;
        if (searchField.toLowerCase().includes(value)) {
            element += `
                <tr class="text-capitalize text-center">
                    <td>${i + 1}</td>
                    <td>${ArrayObject[i].type}</td>
                    <td>${ArrayObject[i].price}</td>
                    <td>${ArrayObject[i].taxes}</td>
                    <td>${ArrayObject[i].ads}</td>
                    <td>${ArrayObject[i].discount}</td>
                    <td>${ArrayObject[i].total}</td>
                    <td>${ArrayObject[i].category}</td>
                    <td><button onclick="getData(${i})" class="btn btn-info">Update</button></td>
                    <td><button onclick="deleteItem(${i})" class="btn btn-danger">Delete</button></td>
                </tr>`;
        }
    }
    tbody.innerHTML = element || '<tr><td colspan="10" class="text-center">No results found</td></tr>';
}
ArrayObject = JSON.parse(localStorage.getItem("project")) || [];
showData();