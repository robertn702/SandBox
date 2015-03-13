Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            var _this = this;
            var region = options.region; // returns main_region
            //Get the photos Entities
            var photos = App.photos;
            //Instantiate the view and pass parameter to it (returns photowall layout)
            this.view = this.getPhotowallView({collection:photos}); //Show the view on the region passed as an options
            region.show(this.view); // shows the photowall layout on the main_region

            // ** Note to self this.view = photowall layout / region = main_region

            // console.log('photos: ', photos);

            //Example of event handling
            this.listenTo(this.view, "show", function(){

            },this);
        },
        getPhotowallView: function(options) {
            return new Show.PhotowallLayout(options);
        }
    });
});
