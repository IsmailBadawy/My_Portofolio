// Variables
{
    var carName = document.getElementById("carName");
    var carType = document.getElementById("carType");
    var carColor = document.getElementById("carColor");
    var carPrice = document.getElementById("carPrice");
    var carModel = document.getElementById("carModel");
    var carDate = document.getElementById("carDate");
    var carCondition = document.getElementById("carCondition");
    var carTable = document.getElementById("carTable");
    var addBtn = document.getElementById("addBtn");
    var updateBtn = document.getElementById("updateBtn");
    var search = document.getElementById("search");
    var deleteAllBtn = document.getElementById("deleteAll");
    var arrayCars = JSON.parse(localStorage.getItem('cars')) || [];
    var index;

    function data(i) {
        let conditionCell = arrayCars[i].Condition;
        if (conditionCell === 'New') {
            conditionCell = `<span style="background-color: green; color:white;padding:5px;">${conditionCell}</span>`;
        }
        else if (conditionCell === 'Used') {
            conditionCell = `<span style="background-color: gold; color:white;padding:5px;">${conditionCell}</span>`;
        }
        return `
        <tr class="">
            <td class="text-center fw-bold ">${arrayCars[i].Name}</td>
            <td class="text-center fw-bold">${arrayCars[i].Type}</td>
            <td class="text-center fw-bold"><input type="color" class="form-control form-control-color m-auto" disabled id="carColor" value="${arrayCars[i].Color}"></td>
            <td class="text-center fw-bold">${arrayCars[i].Price} $</td>
            <td class="text-center fw-bold">${arrayCars[i].Date}</td>
            <td class="text-center fw-bold">${conditionCell}</td> 
            <td class="text-center fw-bold">${arrayCars[i].Model}</td>
            <td class="text-center fw-bold ">
                <button onclick="delItem(${i})" class="btn btn-danger me-2">Delete <i class="fa-solid fa-trash-can"></i></button>
                <button onclick="getData(${i})" class="btn btn-info ms-3">Update <i class="fa-solid fa-pen-to-square"></i></button>
            </td>
        </tr>
        `;
    };
};
// Add Function
addBtn.addEventListener('click',add);
function add() {
    if (carName.value != "" || carType.value != "" || carPrice.value != "" || carModel.value != "" || carDate.value != "" || carCondition.value != "") {
        var CARS =
        {
            Name: carName.value,
            Type: carType.value,
            Color: carColor.value,
            Price: carPrice.value,
            Model: carModel.value,
            Date: carDate.value,
            Condition: carCondition.value,
        };
        arrayCars.push(CARS);
        localStorage.setItem('cars', JSON.stringify(arrayCars));
        clear();
        showData();
    } else {
        alert(" please fill all fields")
    }
};
// Clear Inputs
function clear() {
    carName.value = "";
    carType.value = "";
    carColor.value = "";
    carPrice.value = "";
    carModel.value = "";
    carDate.value = "";
    carCondition.value = "";
};
// Show Data Function
function showData() {
    carTable.innerHTML = "";
    for (let i = 0; i < arrayCars.length; i++) {
        carTable.innerHTML += data(i);
    };

    if (arrayCars.length > 0) {
        deleteAllBtn.classList.remove("d-none");
        search.classList.remove("d-none");
        deleteAllBtn.onclick = deleteAll;
    } else {
        deleteAllBtn.classList.add("d-none");
        search.classList.add("d-none");
    };
};
// Delete 1 Item Function
function delItem(i) {
    let confirmValue = confirm(" Are You Sure ?");
    if (confirmValue === true) {
        arrayCars.splice(i, 1);
        showData();
        localStorage.setItem('cars', JSON.stringify(arrayCars));
    }

};
// Delete All Function
function deleteAll() {
    let confirmValue = confirm("Are You sure to delete All ?")
    if (confirmValue === true) {
        arrayCars.splice(0);
        showData();
        localStorage.setItem('cars', JSON.stringify(arrayCars));
    }
};
// Get Data Function when Edit
function getData(i) {
    carName.value = arrayCars[i].Name;
    carType.value = arrayCars[i].Type;
    carColor.value = arrayCars[i].Color;
    carPrice.value = arrayCars[i].Price;
    carModel.value = arrayCars[i].Model;
    carDate.value = arrayCars[i].Date;
    carCondition.value = arrayCars[i].Condition;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    index = i;
};
// Edit Item Function
updateBtn.onclick = updateData;
function updateData() {
    var CARS = {
        Name: carName.value,
        Type: carType.value,
        Color: carColor.value,
        Price: carPrice.value,
        Model: carModel.value,
        Date: carDate.value,
        Condition: carCondition.value,
    };
    let confirmValue = confirm("Sure Update this ?")
    if (confirmValue === true) {
        addBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
        arrayCars[index] = CARS;
        localStorage.setItem('cars', JSON.stringify(arrayCars));
        clear();
        showData();
    }
};
//  Search Function
search.oninput = Search;
function Search() {
    var Value = search.value.toLowerCase();
    carTable.innerHTML = "";
    for (let i = 0; i < arrayCars.length; i++) {
        if (arrayCars[i].Name.toLowerCase().includes(Value)) {
            carTable.innerHTML += data(i);
        } else {
            carTable.innerHTML = "<TR><TD COLSPAN='8' CLASS='TEXT-CENTER TEXT-DANGER'>NO RESULTS FOUND</TD></TR>";
        }
    }
    localStorage.setItem('cars', JSON.stringify(arrayCars));
}
showData();
