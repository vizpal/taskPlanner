const formValidate = document.querySelector('#form-validate');
const formValidateTaskName = document.querySelector('#form-validate-task-name');
const formValidateTaskDescription = document.querySelector('#form-validate-task-description');
const formValidateTaskAssignedTo = document.querySelector('#form-validate-task-assignedTo');
const formValidateTaskDueDate = document.querySelector('#form-validate-task-DueDate');
let tableData = "";
console.log(formValidate);


// Name -> Not Empty and longer than 8 characters
// Description -> Not Empty and longer than 15 characters
// AssignedTo -> Not Empty and longer than 8 characters
// DueDate  -> Not Empty and not in the past
formValidate.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Task Name :", formValidateTaskName.value.length);
    console.log("Task Description :", formValidateTaskDescription.value.length);
    console.log("Task Assigned To :", formValidateTaskAssignedTo.value.length);

    //   (formValidateTaskName.value.length > 8) ? ( formValidateTaskName.classList.add('is-valid').remove('is-invalid')) :  ( formValidateTaskName.classList.add('is-invalid').remove('is-valid')) ;
    //  (formValidateTaskDescription.value.length < 15 ) ? (formValidateTaskDescription.classList.add('is-valid').remove('is-invalid')) : (formValidateTaskDescription.classList.add('is-invalid').remove('is-valid'));
    //  (formValidateTaskAssignedTo.value.length < 8 ) ? (formValidateTaskAssignedTo.classList.add('is-valid').remove('is-invalid')) :  (formValidateTaskAssignedTo.classList.add('is-invalid').remove('is-valid'));

    if (formValidateTaskName.value.length > 8) {
        formValidateTaskName.classList.add('is-valid');
        formValidateTaskName.classList.remove('is-invalid');
    } else {
        formValidateTaskName.classList.add('is-invalid');
        formValidateTaskName.classList.remove('is-valid');
    }

    if (formValidateTaskDescription.value.length > 15) {
        formValidateTaskDescription.classList.add('is-valid');
        formValidateTaskDescription.classList.remove('is-invalid');
    } else {
        formValidateTaskDescription.classList.add('is-invalid');
        formValidateTaskDescription.classList.remove('is-valid');
    }

    if (formValidateTaskAssignedTo.value.length > 8) {
        formValidateTaskAssignedTo.classList.add('is-valid');
        formValidateTaskAssignedTo.classList.remove('is-invalid');
    } else {
        formValidateTaskAssignedTo.classList.add('is-invalid');
        formValidateTaskAssignedTo.classList.remove('is-valid');
    }

    // Insert Date to HTML Page
    // ----------------------------------------------------------------------------------
    let updateList = document.querySelector("#task-list-update");
    let tableBody = document.querySelector("#table-data");

    let taskPlanner = new taskManager;
    let newTask = new taskObject(0, formValidateTaskName.value, formValidateTaskDescription.value, formValidateTaskAssignedTo.value, formValidateTaskDueDate.value, "ASSIGNED");
    taskPlanner.addTask(newTask);
    console.log(taskPlanner.taskManagerList);

    for (let idx = 0; idx < taskPlanner.taskManagerList.length; idx++) {
        let task = taskPlanner.taskManagerList[idx];
        tableData += `<tr><td>${task.tName}</td><td>${task.tDescription}</td><td>${task.tAssignee}</td></tr>`;
    }

    tableBody.innerHTML = tableData;
});

function updateTaskToPage() {
    let task = taskPlanner.taskManagerList[taskPlanner.taskManagerList.length - 1];
    let rowData = document.createElement('td');
    rowData.innerText = task.tName;
    tableBody.appendChild(rowData);
    rowData = document.createElement('td');
    rowData.innerText = task.tDescription;
    tableBody.appendChild(rowData);
    // rowData = document.createElement('td');
    // rowData.innerText = formValidateTaskAssignedTo.value;
    // tableBody.appendChild(rowData);
    // let itemOne = document.createElement("div");
    // itemOne.innerText = formValidateTaskName.value;

}