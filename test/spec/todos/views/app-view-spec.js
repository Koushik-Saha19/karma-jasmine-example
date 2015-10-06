(function () {
  'use strict';

  describe('AppView', function () {
    beforeEach(function () {
      App.Test.Routes.init();
      App.Test.Routes.enableRoute(App.Test.Routes.TodoRoutes.main);
      this.page = new App.Test.Pages.AppPage();
    });

    afterEach(function () {
      this.page.destroy();
      App.Test.Routes.restore();
    });

    it('should be rendered', function () {
      expect(this.page.getMainElement()).toBeVisible();
    });

    it('should list todos', function () {
      expect(this.page.getTodoList().find('> li')).toHaveLength(3);
    });
  });
}());
