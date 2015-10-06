// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/).

var App = App || {};

App.Config = {
  baseUrl: 'https://doug2k1-todos.firebaseio.com/'
};

// Todo Model
// ----------

App.Todo = Backbone.Model.extend({
  idAttribute: 'name',

  url: function () {
    var url = App.Config.baseUrl + 'todos',
      name = this.get('name');

    if (name) {
      url += '/' + name;
    }

    url += '.json';

    return url;
  },

  // Default attributes for the todo item.
  defaults: function() {
    return {
      title: 'empty todo...',
      order: 1,
      done: false
    };
  },

  // Toggle the `done` state of this todo item.
  toggle: function() {
    this.save({done: !this.get('done')}, {patch: true});
  }
});

// Todo Collection
// ---------------

App.TodoList = Backbone.Collection.extend({
  url: App.Config.baseUrl + 'todos.json',

  // Reference to this collection's model.
  model: App.Todo,

  parse: function (response) {
    return _.map(response, function (value, key) {
      return _.extend({ name: key }, value);
    });
  },

  // Filter down the list of all todo items that are finished.
  done: function() {
    return this.where({done: true});
  },

  // Filter down the list to only todo items that are still not finished.
  remaining: function() {
    return this.where({done: false});
  },

  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder: function() {
    if (!this.length) return 1;
    return this.last().get('order') + 1;
  },

  // Todos are sorted by their original insertion order.
  comparator: 'order'
});

// Todo Item View
// --------------

App.TodoView = Backbone.View.extend({
  tagName:  'li',
  template: App.templates.todo,

  // The DOM events specific to an item.
  events: {
    'click .toggle'   : 'toggleDone',
    'dblclick .view'  : 'edit',
    'click a.destroy' : 'clear',
    'keypress .edit'  : 'updateOnEnter',
    'blur .edit'      : 'close'
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  // Re-render the titles of the todo item.
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass('done', this.model.get('done'));
    this.input = this.$('.edit');
    return this;
  },

  // Toggle the `'done'` state of the model.
  toggleDone: function() {
    this.model.toggle();
  },

  // Switch this view into `'editing'` mode, displaying the input field.
  edit: function() {
    this.$el.addClass('editing');
    this.input.focus();
  },

  // Close the `'editing'` mode, saving changes to the todo.
  close: function() {
    var value = this.input.val();
    if (!value) {
      this.clear();
    } else {
      this.model.save({title: value}, {patch: true});
      this.$el.removeClass('editing');
    }
  },

  // If you hit `enter`, we're through editing the item.
  updateOnEnter: function(e) {
    if (e.keyCode == 13) this.close();
  },

  // Remove the item, destroy the model.
  clear: function() {
    this.model.destroy();
  }
});

// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
App.AppView = Backbone.View.extend({
  template: App.templates.app,

  // Our template for the line of statistics at the bottom of the app.
  statsTemplate: App.templates.stats,

  // Delegated events for creating new items, and clearing completed ones.
  events: {
    'keypress #new-todo':  'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete'
  },

  // At initialization we bind to the relevant events on the `Todos`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting todos that might be saved in *localStorage*.
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'all', this.render);
    this.$el.html(this.template());
    this.collection.fetch();
  },

  // Re-rendering the App just means refreshing the statistics -- the rest
  // of the app doesn't change.
  render: function() {
    var done = this.collection.done().length;
    var remaining = this.collection.remaining().length;

    this.input = this.$('#new-todo');
    this.allCheckbox = this.$('#toggle-all')[0];
    this.footer = this.$('footer');
    this.main = $('#main');

    if (this.collection.length) {
      this.main.show();
      this.footer.show();
      this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
    } else {
      this.main.hide();
      this.footer.hide();
    }

    this.allCheckbox.checked = !remaining;

    return this;
  },

  // Add a single todo item to the list by creating a view for it, and
  // appending its element to the `<ul>`.
  addOne: function(todo) {
    var view = new App.TodoView({model: todo});
    this.$('#todo-list').append(view.render().el);
  },

  // Add all items in the collection at once.
  addAll: function() {
    this.collection.each(this.addOne, this);
  },

  // If you hit return in the main input field, create new **Todo** model,
  // persisting it to *localStorage*.
  createOnEnter: function(e) {
    if (e.keyCode != 13) return;
    if (!this.input.val()) return;

    this.collection.create({
      title: this.input.val(),
      order: this.collection.nextOrder()
    });
    this.input.val('');
  },

  // Clear all done todo items, destroying their models.
  clearCompleted: function() {
    _.invoke(this.collection.done(), 'destroy');
    return false;
  },

  toggleAllComplete: function () {
    var done = this.allCheckbox.checked;
    this.collection.each(function (todo) { todo.save({'done': done}, {patch: true}); });
  }
});
