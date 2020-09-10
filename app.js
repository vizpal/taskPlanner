const formValidate = document.querySelector('#form-validate');
const formValidateTaskName = document.querySelector('#form-validate-task-name');
const formValidateTaskDescription = document.querySelector('#form-validate-task-description');
const formValidateTaskAssignedTo= document.querySelector('#form-validate-task-assignedTo');
const formValidateTaskDueDate= document.querySelector('#form-validate-task-DueDate');
console.log(formValidate);


// Name -> Not Empty and longer than 8 characters
// Description -> Not Empty and longer than 15 characters
// AssignedTo -> Not Empty and longer than 8 characters
// DueDate  -> Not Empty and not in the past
formValidate.addEventListener("submit", (event) => {
    event.preventDefault();
      console.log("Task Name :",formValidateTaskName.value.length);
      console.log("Task Description :",formValidateTaskDescription.value.length);
      console.log("Task Assigned To :",formValidateTaskAssignedTo.value.length);

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

    if (formValidateTaskDescription.value.length > 15 ){
        formValidateTaskDescription.classList.add('is-valid');
        formValidateTaskDescription.classList.remove('is-invalid');
    } else {
        formValidateTaskDescription.classList.add('is-invalid');
        formValidateTaskDescription.classList.remove('is-valid');
    }

    if (formValidateTaskAssignedTo.value.length > 8 ){
        formValidateTaskAssignedTo.classList.add('is-valid');
        formValidateTaskAssignedTo.classList.remove('is-invalid');
    } else {
        formValidateTaskAssignedTo.classList.add('is-invalid');
        formValidateTaskAssignedTo.classList.remove('is-valid');
    }

    let updateList = document.querySelector("#task-list-update")
    let itemOne = document.createElement("div");
    itemOne.innerText = formValidateTaskName.value;

    let itemTwo = document.createElement("div");
    itemTwo.innerText = formValidateTaskDescription.value;

    let itemThree = document.createElement("div");
    itemThree.innerText = formValidateTaskAssignedTo.value;
    updateList.appendChild(itemOne);
    updateList.appendChild(itemTwo);
    updateList.appendChild(itemThree);

    orgHTML = document.getElementById("task-list-update").innerHTML;
    console.log(orgHTML);
    console.log("===============================");
    newHTML = "<div class='row-div'>" + orgHTML + "</div>";
    console.log(newHTML);
    document.getElementById("task-list-update").innerHTML = newHTML;
});

let btnUpdateList = () => {
    let updateList = document.querySelector("task-list-update")
    let para = document.createElement("li");
    console.log(formValidateTaskName);
    para.innerText = formValidateTaskName.value;
    updateList.appendChild(para);
}


//
// Update Task Information to main page 
//
let updateList = document.querySelector("task-list-update")
let para = document.createElement("li");
console.log(formValidateTaskName);
// para.innerText = formValidateTaskName.textContent;
// updateList.appendChild(para);
// console.log(para);
// console.log(formValidateTaskName.textContent);
// console.log(document.createElement('p').innerHTML("Hello World!!"));
// console.log(document.querySelector("#task-list-updated").appendChild(document.createElement('p').innerText("Hello World!!")));
// console.log(document.querySelector("#task-list-updated").appendChild(document.createElement('p').innerText("Hello World!!")));
// console.log(document.querySelector("#task-list-updated").appendChild(document.createElement('p').innerText("Hello World!!")));
// console.log(document.querySelector("#task-list-updated").appendChild(document.createElement('p').innerText("Hello World!!")));