Pixlee.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var _this = this,
        API, _API;

    var API_KEY = 'EonmK92EIISMqSzaoJg';
    var page = 1;
    var next;
    var photosCollection;

    API = {
        getPhotosCollection: function(bootstrap, options) {
            // var photosCollection = new Entities.Photos(options.bootstrap || [], options.options || {});
            if (page == 1) {
                photosCollection = new Entities.Photos(bootstrap.bootstrap || [], options || {});
            }

            var filter_id = '10466';

            var getPhotos = function(pageNum) {
                $.get('https://distillery.pixlee.com/getJSON?api_key='+API_KEY+'&updated_at=2015-03-12T16:55:23Z&page='+pageNum+'&filter_id='+filter_id+'&unique_id=49&per_page=10&sortType=')
                .done(function(data) {
                    page++;
                    next = data.next;
                    console.log("next page: ", page, ", next page avail?: ", next, ", data: ", data.data);
                    photosCollection.add(data.data);
                });
            };

            if (page == 1) {
                getPhotos(page);
                console.log('getting first page of images');
            } else if (page > 1 && next == true) {
                getPhotos(page + 1);
                console.log('getting page ', page + 1, ' of images');
            } else {
                console.log('not more photos');
            }

            return photosCollection;
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

    console.log('App.photos: ', App.photos);

    App.reqres.setHandlers({
        'get:photos': function(bootstrap, options) {
            console.log('get:photos bootstrap: ', bootstrap);
            // console.log('get:photos options: ', options);

            return API.getPhotosCollection({
                bootstrap: bootstrap,
                options: options
            });
        }
    });
});
