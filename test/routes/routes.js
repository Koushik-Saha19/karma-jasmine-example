(function () {
  'use strict';

  App.Test.Routes = {
    init: function () {
      this.server = sinon.fakeServer.create({
        respondImmediately: true
      });
    },

    enableRoute: function (route) {
      var method = route.method || 'GET';

      this.server.respondWith(method, route.url, route.response);
    },

    getRequests: function () {
      return this.server.requests;
    },

    getLastRequest: function () {
      return _.last(this.getRequests());
    },

    getLastResponseJSON: function () {
      var request = this.getLastRequest();

      if (request) {
        return JSON.parse(request.responseText);
      }

      return null;
    },

    getLastResponseJSONOfRoute: function (route) {
      var requests = this.getRequests(),
        request = _.findLast(reqs, function (request) {
          return request.url.match(route.url);
        });

      if (request) {
        return JSON.parse(request.responseText);
      }

      return null;
    },

    restore: function () {
      this.server.restore();
    }
  };
}());
