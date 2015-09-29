(function () {
  'use strict';

  describe('TodoList', function () {
    beforeEach(function () {
      this.todoList = new App.TodoList();
    });

    it('should have correct model', function () {
      expect(this.todoList.model).toEqual(App.Todo);
    });

    it('should filter done items', function () {
      this.todoList.fetch();
    });
  });
}());
