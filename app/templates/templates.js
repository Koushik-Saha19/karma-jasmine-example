this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};
this["App"]["templates"]["app"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"todoapp\">\n\n  <header>\n    <h1>Todos</h1>\n    <input id=\"new-todo\" type=\"text\" placeholder=\"What needs to be done?\">\n  </header>\n  \n  <section id=\"main\">\n    <input id=\"toggle-all\" type=\"checkbox\">\n    <label for=\"toggle-all\">Mark all as complete</label>\n    <ul id=\"todo-list\"></ul>\n  </section>\n  \n  <footer>\n    <a id=\"clear-completed\">Clear completed</a>\n    <div id=\"todo-count\"></div>\n  </footer>\n\n</div>";
},"useData":true});;
this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};
this["App"]["templates"]["stats"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "  <a id=\"clear-completed\">Clear "
    + this.escapeExpression(((helper = (helper = helpers.done || (depth0 != null ? depth0.done : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"done","hash":{},"data":data}) : helper)))
    + " completed item(s)</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.done : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"todo-count\"><b>"
    + this.escapeExpression(((helper = (helper = helpers.remaining || (depth0 != null ? depth0.remaining : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"remaining","hash":{},"data":data}) : helper)))
    + "</b> item(s) left</div>\n";
},"useData":true});;
this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};
this["App"]["templates"]["todo"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return " 'checked=\"checked\"' ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"view\">\n  <input class=\"toggle\" type=\"checkbox\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.done : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " />\n  <label>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</label>\n  <a class=\"destroy\"></a>\n</div>\n<input class=\"edit\" type=\"text\" value=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" />";
},"useData":true});;