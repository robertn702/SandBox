//THis is an example of JST FILE included

// Default templating for Pixlee
_.templateSettings = {
    interpolate: /\[\%\=(.+?)\%\]/gim,
    evaluate: /\[\%(.+?)\%\]/gim,
    escape: /\[\%\-(.+?)\%\]/gim
};

window.JST = {};
window.JST['photowall_layout'] = _.template(
    "<div id='photos_region'></div><div id='pagination_region'></div>"
);
window.JST['photo_template'] = _.template(
    "<a href='[%=platform_link%]' target='_blank'><img src='[%=big_url%]' alt='[%=photo_title%]'></a>"
);
