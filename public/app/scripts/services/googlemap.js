'use strict';

/**
 * @ngdoc service
 * @name waoApp.googleMap
 * @description
 * # googleMap
 * Service in the waoApp.
 */
angular.module('waoApp')
  .service('googleMap', [function() {
    //This is the temporary implementation to check the Google Map performance in SPA.
    //This need to be changed furthur to make it dynamic.
    if (google) {
      var markers = [];
      var polygonCoords = [];
      var bounds;

      var mapOptions = {
        center: new google.maps.LatLng(12.9279232, 77.6271078),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        minZoom: 10,
        maxZoom: 19
      };

      var colorArr = ["#cac9c5", "#cfceca", "#d4d3cf", "#d9d8d4", "#deddd9", "#e3e2de", "#e8e7e3", "#edece8", "#f2f1ed"];
      var arrlength = colorArr.length;
      var mapAccounts = [];
      var outerbounds = [
        new google.maps.LatLng(-85.1054596961173, -180),
        new google.maps.LatLng(85.1054596961173, -180),
        new google.maps.LatLng(85.1054596961173, 180),
        new google.maps.LatLng(-85.1054596961173, 180),
        new google.maps.LatLng(-85.1054596961173, 0)
      ];

      var polygonData;

      var styles = [{
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit.station.bus",
        "stylers": [{
          "hue": "#ffe500"
        }, {
          "saturation": -100
        }]
      }, {
        "featureType": "transit.station.rail",
        "stylers": [{
          "saturation": -100
        }]
      }];
    }




    this.initialize = function(listings) {
      if (google) {
        var ne = listings.polygons.bd9a79c811789df2bda04cea82ffe271.bounds_ne;
        var sw = listings.polygons.bd9a79c811789df2bda04cea82ffe271.bounds_sw;
        var bound1 = new google.maps.LatLng(ne[0], ne[1]);
        var bound2 = new google.maps.LatLng(sw[0], sw[1]);
        var polygons = listings.polygons;
        var mapCanvas = document.getElementById('mapCanvas');

        var gmap = new google.maps.Map(mapCanvas, mapOptions);

        var createMarker = function(info) {
          var marker = new google.maps.Marker({
            map: gmap,
            position: new google.maps.LatLng(info[0], info[1]),
            icon: '../images/Map_icons/contact-marker.png'
          });
          markers.push(marker);
        };

        var customZoom = function() {
          var controlWrapper = document.createElement('div');
          controlWrapper.className = "zoomContainer";

          var zoomInButton = document.createElement('div');
          zoomInButton.className = "zoomButtonContainer";
          zoomInButton.innerHTML = "<i class='fa fa-plus zoomButton'></i>";
          controlWrapper.appendChild(zoomInButton);

          var zoomOutButton = document.createElement('div');
          zoomOutButton.className = "zoomButtonContainer";
          zoomOutButton.innerHTML = "<i class='fa fa-minus zoomButton'></i>";
          controlWrapper.appendChild(zoomOutButton);

          google.maps.event.addDomListener(zoomInButton, 'click', function() {
            gmap.setZoom(gmap.getZoom() + 1);
          });

          google.maps.event.addDomListener(zoomOutButton, 'click', function() {
            gmap.setZoom(gmap.getZoom() - 1);
          });

          gmap.controls[google.maps.ControlPosition.LEFT_TOP].push(controlWrapper);
        };

        gmap.setOptions({
          styles: styles
        });

        customZoom();


        for (var key in polygons) {
          if (polygons.hasOwnProperty(key)) {
            polygonData = polygons[key]['coordinates'];
            break;
          }
        }

        for (var k = 0; k < polygonData.length; k++) {
          polygonCoords.push(new google.maps.LatLng(polygonData[k][0], polygonData[k][1]));
        }

        for (var j = 0; j < arrlength; j++) {
          if (j < mapAccounts.length) {
            mapAccounts[j].setMap(null);
          }
          mapAccounts[j] = new google.maps.Polygon({
            strokeColor: colorArr[j],
            strokeWeight: 10 - j,
            fillColor: '#eeeeee',
            fillOpacity: 0.1,
            paths: [outerbounds, polygonCoords],
            strokePosition: google.maps.StrokePosition.OUTSIDE
          });
          mapAccounts[j].setMap(gmap);
        }

        mapAccounts[arrlength - 1].strokeOpacity = 1;

        for (var i = 0; i < listings.polygons.bd9a79c811789df2bda04cea82ffe271.coordinates.length; i++) {
          createMarker(listings.polygons.bd9a79c811789df2bda04cea82ffe271.coordinates[i], "Koramangala");
        }

        bounds = new google.maps.LatLngBounds();
        bounds.extend(bound2);
        bounds.extend(bound1);

        gmap.fitBounds(bounds);

        var centerLoc = new google.maps.LatLng(listings.polygons.bd9a79c811789df2bda04cea82ffe271.center[0], listings.polygons.bd9a79c811789df2bda04cea82ffe271.center[1]);

        gmap.setCenter(centerLoc);
      }


    };
  }]);
