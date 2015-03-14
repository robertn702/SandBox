Pixlee.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var _this = this,
        API, _API,
        next,
        photosCollection,
        photoQueue = [];

    var API_KEY = 'EonmK92EIISMqSzaoJg';
    var nextPage = 1;

    API = {
        getPhotosCollection: function(bootstrap, options) {
            var filter_id = '10466';

            if (nextPage == 1) {
                photosCollection = new Entities.Photos(bootstrap.bootstrap || [], options || {});
            }


            var bootstrapPhotos = function(data) {
                console.log('bootstrapping photos from page: ', nextPage);

                nextPage++;
                next = data.next;
                photosCollection.add(data.data);
                if (next === true) {
                    getPhotos(nextPage, 'queue');
                }
            };

            var queuePhotos = function(data) {
                console.log('queueing photos from page: ', nextPage);

                next = data.next;
                photoQueue = data.data;
            };

            var dequeuePhotos = function() {
                console.log('dequeueing photos from page: ', nextPage);

                nextPage++;
                photosCollection.add(photoQueue);
                photoQueue = [];
            };

            var loadPhotos = function(data, action) {
                if (action === 'add') {
                    bootstrapPhotos(data);
                } else if (action === 'queue') {
                    queuePhotos(data);
                }
            }

            //Get request to Pixlee API for more photos
            var getPhotos = function(pageNum, action) {
                $.get('https://distillery.pixlee.com/getJSON?api_key='+API_KEY+'&updated_at=2015-03-12T16:55:23Z&page='+pageNum+'&filter_id='+filter_id+'&unique_id=49&per_page=20&sortType=')
                .done(function(data) {
                    console.log('data: ', data);
                    loadPhotos(data, action)
                });
            };


            //Check if more photos are available before making GET request
            if (nextPage === 1) {
                getPhotos(nextPage, 'add'); // nextPage ==== 1
            } else if (nextPage > 1 && next === true) {
                dequeuePhotos();
                getPhotos(nextPage, 'queue');
            } else {
                console.log('all photos displayed');
            }

            return photosCollection;
        }
    };
    //You can add your custom work on the collection in Here,
    //e.g preloading the next 20 images
    // Paginate the list
    Entities.Photo = Backbone.Model.extend({});
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
