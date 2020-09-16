const formValidate = document.querySelector('#form-validate');
const formValidateTaskName = document.querySelector('#form-validate-task-name');
const formValidateTaskDescription = document.querySelector('#form-validate-task-description');
const formValidateTaskAssignedTo = document.querySelector('#form-validate-task-assignedTo');
const formValidateTaskDueDate = document.querySelector('#form-validate-task-DueDate');
let tableData = "";
let validationFail = 0;

// Function clears all Form fields and sets to empty
// Function also clears the validation status.
// ----------------------------------------------------------------------------------
let clearFields = () => {
    formValidateTaskName.value = "";
    formValidateTaskDescription.value = "";
    formValidateTaskAssignedTo.value = "";
    formValidateTaskDueDate.value = "";
    formValidateTaskName.classList.remove('is-valid');
    formValidateTaskDescription.classList.remove('is-valid');
    formValidateTaskAssignedTo.classList.remove('is-valid');
}

// EventListner for Submit Button for adding task. This task is 
// responsible for processing/validating the form data.
// Validation Requirements:  
//      Name -> Not Empty and longer than 8 characters
//      Description -> Not Empty and longer than 15 characters
//      AssignedTo -> Not Empty and longer than 8 characters
//      DueDate  -> Not Empty and not in the past
// ----------------------------------------------------------------------------------
formValidate.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Task Name :", formValidateTaskName.value.length);
    console.log("Task Description :", formValidateTaskDescription.value.length);
    console.log("Task Assigned To :", formValidateTaskAssignedTo.value.length);

    // Form validation for Task Name Field for min length 8
    if (formValidateTaskName.value.length > 8) {
        formValidateTaskName.classList.add('is-valid');
        formValidateTaskName.classList.remove('is-invalid');
    } else {
        formValidateTaskName.classList.add('is-invalid');
        formValidateTaskName.classList.remove('is-valid');
        validationFail++;
    }

    // Form validation for Task Description Field for min length 15
    if (formValidateTaskDescription.value.length > 15) {
        formValidateTaskDescription.classList.add('is-valid');
        formValidateTaskDescription.classList.remove('is-invalid');
    } else {
        formValidateTaskDescription.classList.add('is-invalid');
        formValidateTaskDescription.classList.remove('is-valid');
        validationFail++;
    }

    // Form validation for Task Assigned Field for min length 8 
    if (formValidateTaskAssignedTo.value.length > 8) {
        formValidateTaskAssignedTo.classList.add('is-valid');
        formValidateTaskAssignedTo.classList.remove('is-invalid');
    } else {
        formValidateTaskAssignedTo.classList.add('is-invalid');
        formValidateTaskAssignedTo.classList.remove('is-valid');
        validationFail++;
    }

    // If validation fails then function will not proceed further and 
    // will return. The value of validationFail will also needed to be 
    // reset to 0 for sanity.
    // ----------------------------------------------------------------------------------
    if (validationFail > 0) {
        validationFail = 0;
        return;
    }

    // Insert Date to HTML Page
    // Create a new taskObject and call the addTask method to add the
    // task object to the taskManager array list. The taskManager array
    // elements will hold individual tasks 
    // ----------------------------------------------------------------------------------
    let tableBody = document.querySelector("#table-body-data");
    let taskPlanner = new taskManager;
    let newTask = new taskObject(0,
        formValidateTaskName.value,
        formValidateTaskDescription.value,
        formValidateTaskAssignedTo.value,
        formValidateTaskDueDate.value,
        "ASSIGNED");
    taskPlanner.addTask(newTask);

    // Update table row with row data generated through the taskObject
    // Table updates everytime new the Add Task button is pressed by user.
    // Generated tableDate is added to tableBody element
    // ----------------------------------------------------------------------------------
    for (let idx = 0; idx < taskPlanner.taskManagerList.length; idx++) {
        let task = taskPlanner.taskManagerList[idx];
        tableData += `<tr><td>${task.tName}</td><td>${task.tDescription}</td><td>${task.tAssignee}</td></tr>`;
    }
    tableBody.innerHTML = tableData;

    // Clear all form fields once user data has been processed 
    // ----------------------------------------------------------------------------------
    clearFields();
});

// function updateTaskToPage() {
//     let task = taskPlanner.taskManagerList[taskPlanner.taskManagerList.length - 1];
//     let rowData = document.createElement('td');
//     rowData.innerText = task.tName;
//     tableBody.appendChild(rowData);
//     rowData = document.createElement('td');
//     rowData.innerText = task.tDescription;
//     tableBody.appendChild(rowData);
// rowData = document.createElement('td');
// rowData.innerText = formValidateTaskAssignedTo.value;
// tableBody.appendChild(rowData);
// let itemOne = document.createElement("div");
// itemOne.innerText = formValidateTaskName.value;