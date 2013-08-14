define([
  "namespace",
  "use!backbone"
],
 
function(namespace, Backbone) {
 
  var Twitter = namespace.module();
 
  // Router
  Twitter.Router = Backbone.Router.extend({
    routes: {
      "favourites/"   : "favourites"
    },
 
    favourites: function(){
      var collection = new Twitter.Collection(),
      view = new Twitter.Views.Favourites({collection: collection});
      collection.fetch().complete(function(){
        view.render(function(el){
          $("#main").html(el);
        });
      });
    }
  });
 
  // Instantiate Router
  var router = new Twitter.Router();
 
  // Twitter Model
  Twitter.Model = Backbone.Model.extend({
      url: 'api.php'
  });
 
  // Twitter Collection
  Twitter.Collection = Backbone.Collection.extend({
      model: Twitter.Model,
      url: 'api.php'
  });  
 
  // This will fetch the details template and render it.
  Twitter.Views.Favourites = Backbone.View.extend({
    template: "app/templates/twitter/favourites.html",
 
    render: function(done) {
      var view = this;
 
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl({tweets: view.collection.toJSON()});
 
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },

    events: {
        'click a': 'unfavourite'
    },

    unfavourite: function(e){
        var model = this.collection.get(e.target.rel);
        model.set({
            favorited: true
        });
        model.save();
    }
  });
 
  // This will fetch the list template and render it.
  Twitter.Views.List = Backbone.View.extend({
    template: "app/templates/twitter/list.html",
 
    render: function(done){
      var view = window.view = this;
 
      namespace.fetchTemplate(this.template, function(tmpl){
        view.el.innerHTML = tmpl({tweets: view.collection.toJSON()});
 
        if (_.isFunction(done)){
          done(view.el);
        }
      });
    },

    events: {
        'click a': 'favourite'
    },

    favourite: function(e){
        var model = this.collection.get(e.target.rel);
        model.set({
            favorited: true
        });
        model.save();
    }
  });
 
  // Required, return the module for AMD compliance
  return Twitter;
 
});