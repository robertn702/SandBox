Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            var _this = this;
            var region = options.region;
            //Get the photos Entities
            var photos = App.photos;
            //Instantiate the view and pass parameter to it
            this.view = this.getPhotowallView({
                collection:photos
            });
            //Show the view on the region passed as an options
            region.show(this.view);

            console.log('photos: ', photos);

            var photoView = Marionette.ItemView.extend({
                tagName: 'span',
                template: 'photo_template'
            })

            var photosView = Marionette.CollectionView.extend({
                itemView: photoView
            })


            $('#photos_regions').append(new photosView({collection:photos}).render().el);

            //Example of event handling
            this.listenTo(this.view,"show",function(){

            },this);
        },
        getPhotowallView: function(options) {
            return new Show.PhotowallLayout(options);
        }
    });
});
