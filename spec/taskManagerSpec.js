describe('TaskManager', () => {
    describe('#constructor', () => {
        describe('when initializing a new TaskManager', () => {
            it('should create an empty tasks array', () => {
                const tskManager = new taskManager();

                expect(tskManager.taskManagerList).toEqual([]);
            });
        });
    });
});