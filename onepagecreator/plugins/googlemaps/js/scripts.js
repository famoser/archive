/**
 * Created by Florian Moser on 25.12.2015.
 */
var map;
//noinspection JSUnusedGlobalSymbols
function InitializeMap() {
    var latlng = new google.maps.LatLng([LAT], [LNG]);
    // prepare the map properties
    var options = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControl: true,
        mapTypeControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
    };

    // initialize the map object
    map = new google.maps.Map(document.getElementById('[SELECTOR]'), options);

    // create a LatLng object containing the coordinate for the center of the map
    // add Marker
    var marker1 = new google.maps.Marker({
        position: latlng,
        map: map
    });

    var cont = '<div><p style="[FOREGROUNDCOLOR]">[GOOGLEMAPSCONTENT]</p></div>';

    // add information window
    var infowindow1 = new google.maps.InfoWindow({
        content: cont
    });

    google.maps.event.addListener(marker1, 'click', function () {
        infowindow1.open(map, marker1);
    });

    infowindow1.open(map, marker1);
}

