(function () {
  'use strict';

  App.Test.Routes.TodoRoutes = {
    main: {
      method: 'GET',
      url: /todos\.json/,
      response: JSON.stringify(_.extend({},
        Factory.create('todo'),
        Factory.create('done-todo'),
        Factory.create('todo')))
    }
  };
}());
