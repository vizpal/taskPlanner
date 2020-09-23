const tableBody = document.querySelector("#table-body-data");
const formValidate = document.querySelector('#form-validate');
const formValidateTaskName = document.querySelector('#form-validate-task-name');
const formValidateTaskDescription = document.querySelector('#form-validate-task-description');
const formValidateTaskAssignedTo = document.querySelector('#form-validate-task-assignedTo');
const formValidateTaskDueDate = document.querySelector('#form-validate-task-DueDate');
const formValidateTaskStatus = document.querySelector('#form-validate-task-status');
const formValidateTaskPriority = document.querySelector('#form-validate-task-priority');
let tableData = "";
let validationFail = 0;
let taskId = 0;
let storeTaskPlanner;
let taskPlanner = new taskManager;


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

// Update table row with row data generated through the taskObject
// Table updates everytime new the Add Task button is pressed by user.
// Generated tableDate is added to tableBody element
// ----------------------------------------------------------------------------------
let renderPage = (taskPlanner) => {
        console.log(`=============== RENDER HTML ===================`)
        console.log(taskPlanner);
        tableData = [];
        for (let idx = 0; idx < taskPlanner.taskManagerList.length; idx++) {
            let task = taskPlanner.taskManagerList[idx];
            tableData += `<tr data-task-id=${task.tId}>
                            <td>${task.tName}</td>
                            <td>${task.tDescription}</td>
                            <td>${task.tAssignee}</td>
                            <td>${task.tDate}</td>
                            <td>${task.tStatus}</td>
                            <td>${task.tPriority}</td>
                            <td><i class="btn btn-outline-danger far fa-times-circle delete-button" title="Delete Task"></i>
                                <i class="btn btn-outline-success far fa-check-circle done-button ${(task.tStatus=="Done")?"invisible":"visible"}" title="Mark as Done"></i>
                                <i class="btn btn-outline-primary far fa-keyboard edit-button" title="Edit Task"></i>
                            </td>
                        </tr>`;
        }
        tableBody.innerHTML = tableData;

        // Set table row color to green for status DONE tasks.
        document.querySelectorAll('tr').forEach((item) => {
            // cells[4] represents the 4th column of the rendered table corresponds to "status"
            if (item.cells[4].outerText == "Done") item.style.backgroundColor = "#CAF6CA";
        });
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
    console.log("Task Due Date :", formValidateTaskDueDate.value);
    console.log("Task Status:", formValidateTaskStatus.value);
    console.log("Task Priority:", formValidateTaskPriority.value);

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
    let newTask = new taskObject(taskId,
        formValidateTaskName.value,
        formValidateTaskDescription.value,
        formValidateTaskAssignedTo.value,
        formValidateTaskDueDate.value,
        formValidateTaskStatus.value,
        formValidateTaskPriority.value);
    taskId++;
    taskPlanner.addTask(newTask);


    // Save to Local Storage 
    // ----------------------------------------------------------------------------------
    taskPlanner.save(taskId - 1);

    // Render new task to page 
    // ----------------------------------------------------------------------------------
    renderPage(taskPlanner);

    // Clear all form fields once user data has been processed 
    // ----------------------------------------------------------------------------------
    // clearFields();
});

const taskList = document.querySelector('#table-data');
// Add singular event listner to traverse the DOM when the 
// mark-as-done button has been clicked
// ----------------------------------------------------------------------------------
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;
        const gotTaskId = parentTask.dataset.taskId;
        taskPlanner.getTaskById(gotTaskId).tStatus = 'Done';
        taskPlanner.save(gotTaskId);
        renderPage(taskPlanner);
    }

    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.parentElement.parentElement;
        const gotTaskId = parentTask.dataset.taskId;
        taskPlanner.deleteTaskById(gotTaskId);
        taskPlanner.save(gotTaskId);
        renderPage(taskPlanner);
    }
});

const darkMode = document.getElementById("toggle-dark-mode");
// Add darkmode togglr button to navbar with fa icon switcher.  
// Event listner also adds class based on darmode value
// ----------------------------------------------------------------------------------
// TODO: Add CSS transition effect 
darkMode.addEventListener('click', (event) => {
    if (event.target.classList.contains("fa-sun")) {
        event.target.classList.remove("fa-sun");
        event.target.classList.add("fa-moon");
    } else if (event.target.classList.contains("fa-moon")) {
        event.target.classList.remove("fa-moon");
        event.target.classList.add("fa-sun");
    }
});


if (typeof localStorage !== 'undefined') {
    taskPlanner.load();
    renderPage(taskPlanner);
} else {
    console.log("------- LocalStorage is Undefined -------");
}