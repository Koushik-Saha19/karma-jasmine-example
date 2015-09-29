(function () {
  'use strict';

  describe('Todo', function () {
    it('should have default values', function () {
      var todo = new App.Todo();

      expect(todo.get('title')).toEqual('empty todo...');
      expect(todo.get('order')).toEqual(1);
      expect(todo.get('done')).toBeFalsy();
    });

    it('should toggle state', function () {
      var todo = new App.Todo();
      todo.toggle();
      expect(todo.get('done')).toBeTruthy();
      todo.toggle();
      expect(todo.get('done')).toBeFalsy();
    });
  });
}());
