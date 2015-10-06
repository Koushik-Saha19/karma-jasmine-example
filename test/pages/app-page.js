(function () {
  'use strict';

  App.Test.Pages.AppPage = Class.extend({
    init: function () {
      this.appView = new App.AppView({
        collection: new App.TodoList()
      });
      $('body').prepend(this.appView.render().el);
      this.$el = this.appView.$el;
    },

    getMainElement: function () {
      return this.$el.find('#todoapp');
    },

    getTodoList: function () {
      return this.$el.find('#todo-list');
    },

    destroy: function () {
      this.$el.remove();
    }
  });
}());
