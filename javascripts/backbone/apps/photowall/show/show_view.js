Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _) {
	//This is the layout
    Show.PhotowallLayout = Marionette.Layout.extend({
        initialize: function() {
            $(window).on('scroll', _.bind(this.scrolling, this));
        },
        scrolling: function() {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                App.request("get:photos", App.photos);
            }
        },
        remove: function() {
            $(window).off('scroll');
        },
        template: 'photowall_layout',
        regions: {
            photos_region: "#photos_region",
            pagination_region: "#pagination_region"
        },
        onShow: function(options) {
            //Renders the photos collection view
            var photosView = new Show.PhotosView({collection:this.collection});
            this.photos_region.show(photosView);
        }
    }),
    //Item view of images
    Show.PhotoView = Marionette.ItemView.extend({
        tagName: 'span',
        className: 'wall-image',
        template: 'photo_template'
    }),
    //Collection view of images
    Show.PhotosView = Marionette.CollectionView.extend({
        itemView: Show.PhotoView
    })
});
