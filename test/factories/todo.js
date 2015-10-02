(function () {
  'use strict';

  Factory.define('todo', function (attrs) {
    var key = 'name' + this.sequence('name'),
      obj = {};

    obj[key] = {
      title: 'Test title ' + this.sequence('title'),
      done: !!this.is('done'),
      order: this.sequence('order') + 1
    };

    return _.extend(obj, attrs);
  });
}());
