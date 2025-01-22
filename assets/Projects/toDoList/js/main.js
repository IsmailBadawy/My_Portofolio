let inpName = document.getElementById("inpName");
let inpType = document.getElementById("inpType");
let inpStartDate = document.getElementById("inpStartDate");
let inpEndDate = document.getElementById("inpEndDate");
let inpStatus = document.getElementById("inpStatus");
let inpPriority = document.getElementById("inpPriority");
let inpLevel = document.getElementById("inpLevel");
let inpProgress = document.getElementById("inpProgress");
let inpNotes = document.getElementById("inpNotes");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let bodyTable = document.querySelector(".bodyTable")
let tableCard = document.querySelector(".table-card")
let tableBtn = document.getElementById("tableBtn")
let cardBtn = document.getElementById("cardBtn")
let index;
var arrayTasks = JSON.parse(localStorage.getItem('arrayTasks')) || [];

// Add function
addBtn.addEventListener('click', Add);
function Add() {

    let newObject = {
        name: inpName.value,
        type: inpType.value,
        startDate: inpStartDate.value,
        endDate: inpEndDate.value,
        status: inpStatus.value,
        priority: inpPriority.value,
        level: inpLevel.value,
        progress: inpProgress.value,
        notes: inpNotes.value,
    };
    arrayTasks.push(newObject);
    localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));


    clearData()
    showData()
}
// Clear Data Function
function clearData() {
    inpName.value = '';
    inpType.value = '';
    inpStartDate.value = '';
    inpEndDate.value = '';
    inpStatus.value = 'Task Status...';
    inpPriority.value = 'Task Priority...';
    inpLevel.value = 'Difficulty Level...';
    inpProgress.value = '0';
    inpNotes.value = '';

}
// Show Function
function showData() {
    let elementsTable = '';
    let elementsCard = '';
    arrayTasks.forEach((task, i) => {
        elementsTable += `
            <tr class="tableRow ${task.status === 'Completed' ? 'completed' : ''}">
                <td>${i + 1}</td>
                <td>${task.name}</td>
                <td>${task.type}</td>
                <td>${task.startDate}</td>
                <td>${task.endDate}</td>
                <td>${task.status}</td>
                <td>${task.priority}</td>
                <td>${task.level}</td>
                <td>${task.progress}%</td>
                <td><button onclick="Action(${i})" class="btn btn-success"><i class="fa-solid fa-check"></i></button></td>
                <td><button onclick="getData(${i})" class="btn btn-info"><i class="fa-solid fa-pen-nib"></i></button></td>
                <td><button onclick="deleteTask(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
                <td>${task.notes}</td>
            </tr>`;

        elementsCard += `
            <div class="card mb-3 ${task.status === 'Completed' ? 'completed' : ''}">
                <div class="card-body">
                    <h3 class="card-title">Task ${i + 1}</h3>
                    <p><strong>Name:</strong> ${task.name}</p>
                    <p><strong>Type:</strong> ${task.type}</p>
                    <p><strong>Start Date:</strong> ${task.startDate}</p>
                    <p><strong>Estimated  Date:</strong> ${task.endDate}</p>
                    <p><strong>Status:</strong> ${task.status}</p>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                    <p><strong>Level:</strong> ${task.level}</p>
                    <p><strong>Progress:</strong> ${task.progress}%</p>
                    <p><strong>Notes:</strong> ${task.notes}</p>
                    <button onclick="Action(${i})" class="btn btn-success">Mark as Completed</button>
                    <button onclick="getData(${i})" class="btn btn-info">Edit</button>
                    <button onclick="deleteTask(${i})" class="btn btn-danger">Delete</button>
                </div>
            </div>`;
    });

    bodyTable.innerHTML = elementsTable;
    tableCard.innerHTML = elementsCard;

}
// Delete Item 
function deleteTask(i) {
    arrayTasks.splice(i, 1)
    showData()

}
// Get Data Function
function getData(i) {
    index = i;
    let Task = arrayTasks[i]

    inpName.value = Task.name;
    inpType.value = Task.type;
    inpStatus.value = Task.status;
    inpPriority.value = Task.priority;
    inpLevel.value = Task.level;
    inpStartDate.value = Task.startDate;
    inpEndDate.value = Task.endDate;
    inpProgress.value = Task.progress;
    inpNotes.value = Task.notes;

    inpName.disabled = true;
    inpType.disabled = true;
    inpStartDate.disabled = true;
    inpPriority.disabled = true;
    inpLevel.disabled = true;
    addBtn.style.display = 'none';
    updateBtn.classList.remove('d-none');

    scroll({ top: 0, behavior: 'smooth' })
    localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));
    showData()

}
// Update Data
updateBtn.addEventListener('click', () => {
    updateData(index)
})
function updateData(i) {
    let Task = arrayTasks[i]
    Task.name = inpName.value;
    Task.type = inpType.value;
    Task.status = inpStatus.value;
    Task.priority = inpPriority.value;
    Task.level = inpLevel.value;
    Task.startDate = inpStartDate.value;
    Task.endDate = inpEndDate.value;
    Task.progress = inpProgress.value;
    Task.notes = inpNotes.value;

    localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));
    updateBtn.classList.add('d-none');
    addBtn.style.display = 'block';
    showData();
    clearData();

}

// Action Function
function Action(i) {
    const Card = document.querySelectorAll('.card');
    const tableRow = document.querySelectorAll('.tableRow');

    tableRow[i].style.color = "green";
    tableRow[i].style.opacity = '0.5';
    tableRow[i].style.pointerEvents = 'none';

    Card[i].style.color = "green";
    Card[i].style.opacity = '0.5';
    Card[i].style.pointerEvents = 'none';

    arrayTasks[i].status = 'Completed';
    arrayTasks[i].progress = 100;
    // arrayTasks[i].status.style.color = "green";


    localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));
    showData();
}

// View Table Function
tableBtn.addEventListener('click', () => {
    let table = document.querySelector(".table")

    table.style.display = 'inline-block';
    tableCard.style.display = 'none';

});

// View Card Function
cardBtn.addEventListener('click', () => {
    let table = document.querySelector(".table")

    table.style.display = 'none';
    tableCard.style.display = 'flex';
    tableCard.style.flexWrap = 'wrap';

});
showData()
