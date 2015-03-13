var Pixlee = (function(Backbone, Marionette) {
    var App,
        _this = this;

    App = new Marionette.Application();

    App.on('initialize:before', function(options) {
        //You can handle the options passed to the function start
        console.log('App.on initialize:before options: ', options);
        App.photos = App.request("get:photos", options.photos); // gets entity photo collection;
        console.log('App.photos: ', App.photos);
        App.rootRoute = "photowall"; // routes to Showphotowall
    });

    var window_region = Marionette.Region.extend({
        el: $(window),
        events: {
            'scroll': 'scrolling'
        },
        initialize: function() {
            _.bindAll(this, "scrolling");
            this.scrolling();
        },
        scrolling: function() {
            console.log('im scrolling');
        }
    })

    App.addRegions({
        window_region: window_region,
        header_region: '#header_region',
        main_region: '#main_region',
        footer_region: '#footer_region'
    });

    App.reqres.setHandler('default:region', function() {
        return App.main_region;
    });

    App.on('initialize:after', function() {
        this.startHistory();
        if (!this.getCurrentRoute()) {
            return this.navigate(this.rootRoute, {
                trigger: true
            });
        }
    });

    return App;
})(Backbone, Marionette);
