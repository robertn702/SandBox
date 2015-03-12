Pixlee.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var _this = this,
        API, _API;
    API = {
        getPhotosCollection: function(options) {
            return new Entities.Photos(options.bootstrap || [], options.options || {});
        }
    };
    //You can add your custom work on the collection in Here,
    //e.g preloading the next 20 images
    // Paginate the list
    Entities.Photo = Backbone.Model.extend({

    });
    Entities.Photos = Backbone.Collection.extend({
        model: Entities.Photo
    });
    App.reqres.setHandlers({
        'get:photos': function(bootstrap, options) {
            return API.getPhotosCollection({
                bootstrap: bootstrap,
                options: options
            });
        }
    });
});
