describe('TaskManager', () => {
    describe('#constructor', () => {
        describe('when initializing a new TaskManager', () => {
            it('should create an empty tasks array', () => {
                const tskManager = new taskManager();
                expect(tskManager.taskManagerList).toEqual([]);
            });
        });
    });

    describe('#addTask', () => {
        describe('when addTask method is passed a task', () => {
            it('should add new task to taskManagerList array', () => {
                const task = new taskObject(0, 'Dummy', 'Dummy', 'Dummy', '1/1/2020', '', '');
                const tskManager = new taskManager();
                tskManager.addTask(task);
                expect(tskManager.taskManagerList[0]).toEqual(task);
            })
        })
    })

    describe('#deleteTask', () => {
        describe('when deleteTask method is passed an ID', () => {
            it('should delete task with corresponding ID from taskManager', () => {
                const tskManager = new taskManager();
                let taskToDelete, task;
                for (let i = 0; i < 10; i++) {
                    if (i == 5) {
                        taskToDelete = new taskObject(i, 'Dummy', 'Dummy', 'Dummy', '1/1/2020', '', '');
                        tskManager.addTask(taskToDelete);

                    } else {
                        task = new taskObject(i, 'Normal', 'Normal', 'Normal', '', '', '');
                        tskManager.addTask(task);
                    }
                }
                tskManager.deleteTaskById(taskToDelete.tId);
                expect(tskManager.taskManagerList).not.toContain(taskToDelete);
            })
        })
    })
});