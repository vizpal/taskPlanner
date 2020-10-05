const tableBody = document.querySelector("#table-body-data");
const formValidate = document.querySelector('#form-validate');
const formValidateTaskName = document.querySelector('#form-validate-task-name');
const formValidateTaskDescription = document.querySelector('#form-validate-task-description');
const formValidateTaskAssignedTo = document.querySelector('#form-validate-task-assignedTo');
const formValidateTaskDueDate = document.querySelector('#form-validate-task-DueDate');
const formValidateTaskStatus = document.querySelector('#form-validate-task-status');
const formValidateTaskPriority = document.querySelector('#form-validate-task-priority');
let editName = document.querySelector('#modal-edit-task-name');
let editDescription = document.querySelector('#modal-edit-task-description');
let editAssignedTo = document.querySelector('#modal-edit-task-assignedTo');
let editDueDate = document.querySelector('#modal-edit-task-dueDate');
let editStatus = document.querySelector('#modal-edit-task-status');
let editPriority = document.querySelector('#modal-edit-task-priority');
const saveBtn = document.querySelector("#save-button");
const taskListEnable = document.querySelector(".task-list");
let tableData = "";
let validationFail = 0;
let taskId = 0;
let storeTaskPlanner;
let editTaskId = 0;
let editTsk;
let taskPlanner = new taskManager;


// Function clears all Form fields and sets to empty
// Function also clears the validation status.
// ----------------------------------------------------------------------------------
let clearFields = () => {
    let today = new Date().toISOString().slice(0, 10);
    formValidateTaskName.value = "";
    formValidateTaskDescription.value = "";
    formValidateTaskAssignedTo.value = "";
    formValidateTaskDueDate.value = today;
    formValidateTaskStatus.value = "Opened";
    formValidateTaskPriority.value = "Medium";
    formValidateTaskName.classList.remove('is-valid');
    formValidateTaskDescription.classList.remove('is-valid');
    formValidateTaskAssignedTo.classList.remove('is-valid');
    formValidateTaskDueDate.classList.remove('is-valid');
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
                            <td>${task.tDate.split('-')[2]+"/"+task.tDate.split('-')[1]+"/"+task.tDate.split('-')[0]}</td>
                            <td>${task.tStatus}</td>
                            <td>${task.tPriority}</td>
                            <td><i class="btn btn-outline-danger far fa-times-circle delete-button" title="Delete Task"></i>
                                <i class="btn btn-outline-success far fa-check-circle done-button ${(task.tStatus=="Done")?"invisible":"visible"}" title="Mark as Done"></i>
                                <i class="btn btn-outline-primary far fa-keyboard edit-button" data-toggle="modal" data-target="#myModal" title="Edit Task"></i>
                            </td>
                        </tr>`;
        }
        tableBody.innerHTML = tableData;

        // Set table row color to green for status DONE tasks.
        document.querySelectorAll('tr').forEach((item) => {
            // cells[4] represents the 4th column of the rendered table corresponds to "status"
            if (item.cells[4].outerText == "Done") item.style.backgroundColor = "#CAF6CA";
        });

        // Set table row color to red for status high priority tasks.
        document.querySelectorAll('tr').forEach((item) => {
            // cells[5] represents the 5th column of the rendered table corresponds to "priority"
            if (item.cells[5].outerText == "High") item.style.backgroundColor = "#FCD5CE";
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
    let todaysDate = new Date(Date.now()).toLocaleString().split(',')[0].split('/');
    let day = todaysDate[0];
    let month = todaysDate[1];
    let year = todaysDate[2];
    // taskDueDate is in yyyy-mm-dd format
    let taskDueDate = formValidateTaskDueDate.value.split('-');
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
    console.log(`taskDueDate[2]:${taskDueDate[2]} day:${day} taskDueDate[1]:${taskDueDate[1]} month:${month}`)
    if ((taskDueDate[2] >= day) && (taskDueDate[1] >= month)) {
        console.log("-----is-valid")
        formValidateTaskDueDate.classList.add('is-valid');
        formValidateTaskDueDate.classList.remove('is-invalid');
    } else {
        console.log("-----is-invalid")
        formValidateTaskDueDate.classList.add('is-invalid');
        formValidateTaskDueDate.classList.remove('is-valid');
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
    console.log(`taskId: ${taskId}`)
    taskPlanner.addTask(newTask);

    // Everytime a new task is validated and added ensure that taskList is displayed
    taskListEnable.style.display = 'block';

    // Save to Local Storage 
    // ----------------------------------------------------------------------------------
    taskPlanner.save(taskId - 1);

    // Render new task to page 
    // ----------------------------------------------------------------------------------
    renderPage(taskPlanner);

    // Clear all form fields once user data has been processed 
    // ----------------------------------------------------------------------------------
    clearFields();
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
        renderPage(taskPlanner);
    }

    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.parentElement.parentElement;
        const gotTaskId = parentTask.dataset.taskId;
        taskPlanner.deleteTaskById(gotTaskId);
        // Disable displaying the TaskList if the last task was deleted
        if (taskPlanner.taskManagerList.length == 0) {
            taskListEnable.style.display = 'none';
        }
        renderPage(taskPlanner);
    }

    if (event.target.classList.contains('edit-button')) {
        editName.value = "";
        editDescription.value = "";
        editAssignedTo.value = "";
        editDueDate.value = "";
        editStatus.value = "";
        editPriority.value = "";
        const parentTask = event.target.parentElement.parentElement;
        let gotTaskId = parentTask.dataset.taskId;
        let edtTsk = taskPlanner.editTaskById(gotTaskId);
        console.log(`gotTaskId: ${gotTaskId}`)
        console.log("-----edit task------")
        console.log(`edtTsk.tDate: ${edtTsk.tDate}`)
        editName.value = edtTsk.tName;
        editDescription.value = edtTsk.tDescription;
        editAssignedTo.value = edtTsk.tAssignee;
        // editDueDate.value = edtTsk.tDate;
        editDueDate.value = edtTsk.tDate;
        editStatus.value = edtTsk.tStatus;
        editPriority.value = edtTsk.tPriority;
        editTaskId = gotTaskId;
    }
});

// TODO: Add CSS transition effect 
saveBtn.addEventListener('click', (event) => {
    let editTsk = new taskObject(Number(editTaskId),
        editName.value,
        editDescription.value,
        editAssignedTo.value,
        editDueDate.value,
        editStatus.value,
        editPriority.value);
    taskPlanner.edit(editTaskId, editTsk)
    for (let i = 0; i < taskPlanner.taskManagerList.length; i++) {
        if (taskPlanner.taskManagerList[i].tId == editTaskId) {
            taskPlanner.taskManagerList[i] = editTsk;
        }
    }
    renderPage(taskPlanner);
});

//const darkMode = document.getElementById("toggle-dark-mode");
// Add darkmode togglr button to navbar with fa icon switcher.  
// Event listner also adds class based on darmode value
// ----------------------------------------------------------------------------------
document.addEventListener(
    'DOMContentLoaded', (event) => {
        applyTheme();
        const toggleDarkMode = document.getElementById('toggle-dark-mode');
        toggleDarkMode.onclick = function() {
            let currentMode = localStorage.getItem('mode');
            localStorage.setItem(
                'mode',
                currentMode === 'dark' ? 'light' : 'dark'
            );
            applyTheme();
        }
    }
);

function applyTheme() {
    let html = document.documentElement;
    let currentMode = localStorage.getItem('mode');
    if (currentMode === 'dark') {
        html.classList.add('dark');
        document.getElementById('toggle-dark-mode').innerHTML =
            '<i class="btn btn-light fas fa-sun" title="Light Mode"></i>';
    } else {
        html.classList.remove('dark');
        document.getElementById('toggle-dark-mode').innerHTML =
            '<i class="btn btn-light fas fa-moon" title="Dark Mode"></i>';
    }
}

// Check for local storage and call renderPage() is returned data 
// ----------------------------------------------------------------------------------
if (typeof localStorage !== 'undefined') {
    document.getElementById('form-validate-task-DueDate').valueAsDate = new Date();
    if (taskPlanner.load()[0]) {
        taskListEnable.style.display = 'block';
        renderPage(taskPlanner);
        taskId = taskPlanner.load()[1] + 1;
        console.log(`Loaded ID: ${taskId}`)
    }
} else {
    console.log("------- LocalStorage is Undefined -------");
}