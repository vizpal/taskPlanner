// Individual Task object class
class taskObject {
    constructor(tId, tName, tDescription, tAssignee, tDate, tStatus, tPriority) {
        this.tId = tId;
        this.tName = tName;
        this.tDescription = tDescription;
        this.tAssignee = tAssignee;
        this.tDate = tDate;
        this.tStatus = tStatus;
        this.tPriority = tPriority;
    }
}

// Task Manager Object
class taskManager {
    constructor() {
        this.taskManagerList = [];
    }

    // Function getAllTasks retruns list of all tasks
    getAllTasks() {
        if (this.taskManagerList.length == 0) alert("Empty taskManagerList !!")
        else return this.taskManagerList;
    }

    // Return the task when requested using an ID field 
    getTaskById(id) {
        for (let i = 0; i < this.taskManagerList.length; i++) {
            if (this.taskManagerList[i].tId == id) return this.taskManagerList[i];
            else console.log(`id:${id} not found in TaskList.`)
        }
    }

    // Return the task when requested using an ID field 
    deleteTaskById(id) {
            for (let i = 0; i < this.taskManagerList.length; i++) {
                if (this.taskManagerList[i].tId == id) {
                    return this.taskManagerList.splice(i, 1);
                } else console.log(`id:${id} not found in TaskList.`);
            }
        }
        // Function getTasksWithStatus returns list with specified status
        // getTasksWithStatus(status) {
        //         for (let i = 0; i < taskManagerList.length; i++) {
        //             return this.taskManagerList.filter((i, status) => {
        //                 return i.tStatus == status;
        //             })
        //         }
        //     }
        // Function addTask adds task to back of aray object
    addTask(task) {
        return this.taskManagerList.push(task);
    }

    // Function deleteTask deletes task from task list
    deleteTask(task) {
            return this.taskManagerList.pop();
        }
        // Function updateTask updates the task status
    updateTask(taskId, status) {
            for (let i = 0; i < this.taskManagerList.length; i++) {
                if (i.Id == taskId) i.tStatus = status
            }
            return this.taskManagerList;
        }
        // Function assignTask updates assignee to task
    assignTask(taskId, assignee) {
        for (let i = 0; i < this.taskManagerList.length; i++) {
            if (i.Id == taskId) i.tAssignee = assignee;
        }
        return this.taskManagerList;
    }
}