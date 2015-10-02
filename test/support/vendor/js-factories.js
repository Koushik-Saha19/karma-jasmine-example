// Generated by CoffeeScript 1.7.1
(function() {
  var __slice = [].slice;

  (function(name, context, factory) {
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
      return module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
      return define(function() {
        return factory();
      });
    } else {
      return context[name] = factory();
    }
  })('Factory', this, function() {
    var Factory, sequencer;
    sequencer = function(property) {
      var value;
      value = this.sequences[property] != null ? this.sequences[property] += 1 : this.sequences[property] = 0;
      if (typeof property === 'function') {
        return property(value);
      } else {
        return value;
      }
    };
    Factory = {
      factories: {},
      define: function(factoryName, builder) {
        if (factoryName.indexOf('-') > 0) {
          throw new Error("Factory name '" + factoryName + "' can't use - in name. It clashes with the traits construct");
        }
        if (this.factories[factoryName] != null) {
          throw new Error("Factory " + factoryName + " is already defined");
        }
        return this.factories[factoryName] = {
          sequences: {},
          factory: builder
        };
      },
      create: function() {
        var args, f, factoryName, nameWithTraits, obj, r, traits;
        nameWithTraits = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        traits = nameWithTraits.split('-');
        factoryName = traits.pop();
        if (this.factories[factoryName] == null) {
          throw new Error("Factory " + factoryName + " does not exist");
        }
        f = this.factories[factoryName];
        obj = {
          sequences: f.sequences,
          factory: f.factory,
          sequence: sequencer,
          traits: traits,
          is: function(name) {
            return ~this.traits.indexOf(name);
          },
          trait: function() {
            var name, names, _i, _len, _ref;
            names = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            _ref = this.traits;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              name = _ref[_i];
              if (~names.indexOf(name)) {
                return name;
              }
            }
          },
          sample: function() {
            var values;
            values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return values[Math.floor(Math.random() * values.length)];
          }
        };
        r = obj.factory.apply(obj, args);
        f.sequences = obj.sequences;
        obj = null;
        return r;
      },
      createList: function() {
        var amount, args, i, _i, _results;
        amount = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        _results = [];
        for (i = _i = 1; 1 <= amount ? _i <= amount : _i >= amount; i = 1 <= amount ? ++_i : --_i) {
          _results.push(this.create.apply(this, args));
        }
        return _results;
      },
      resetFactories: function() {
        return this.factories = [];
      }
    };
    return Factory;
  });

}).call(this);
