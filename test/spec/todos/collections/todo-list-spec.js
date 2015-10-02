(function () {
  'use strict';

  describe('TodoList', function () {
    beforeEach(function () {
      App.Test.Routes.init();
      App.Test.Routes.enableRoute(App.Test.Routes.TodoRoutes.main);
      this.todoList = new App.TodoList();
    });

    afterEach(function () {
      App.Test.Routes.restore();
    });

    it('should have correct model', function () {
      expect(this.todoList.model).toEqual(App.Todo);
    });

    it('should filter done items', function () {
      this.todoList.fetch();
      expect(this.todoList.done().length).toEqual(1);
    });

    it('should filter remaining items', function () {
      this.todoList.fetch();
      expect(this.todoList.remaining().length).toEqual(2);
    });

    it('should calculate the next order', function () {
      this.todoList.fetch();
      expect(this.todoList.nextOrder()).toEqual(4);
    });
  });
}());
