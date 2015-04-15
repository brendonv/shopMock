angular.module('zlMall')
  .controller('Map', ['$timeout', '$scope', function($timeout, $scope) {
    $scope.mapReady = false;
    $scope.mapIn = false;
    $scope.detailStore = null;
    $scope.hideDeatil = false;
    var styleOptions = [{
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }]
    }];
    var mapOptions = {
      center: {lat: 37.442879,lng: -122.171252},
      zoom: 17
    };
    var styledMap = new google.maps.StyledMapType(styleOptions, {name: "Styled Map"});
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
      var nodes = document.getElementsByClassName("gmnoprint");
      //HIDE GOOGLE MAP DEFAULT WIDGETS
      angular.forEach(nodes, function(node) {
        node.style.display = "none";
      });
      $scope.$apply(function(){$scope.mapReady = true});
    });
    /**
    *  MALL COORDINATES
    **/
    var coordinates = [
    {name:"BLOOMINGDALE'S",lat:37.443358,lng:-122.170488},
    {name:"MACY'S",lat:37.442208,lng:-122.171697},
    {name:"NEIMAN MARCUS", lat:37.441318,lng:-122.172671},
    {name:"NORDSTROM'S", lat:37.439182,lng:-122.173639},
    {name:"CRATE & BARREL", lat:37.438986,lng:-122.172480}
    ];
    MallOverlay.prototype = new google.maps.OverlayView();
    var overlay = new MallOverlay();

    /** 
    * onAdd is called when the map's panes are ready and the overlay has been added to the map.
    */

    function MallOverlay() {
      this.div = null;
      this.setMap(map);
    }

    MallOverlay.prototype.onAdd = function() {
      var panes = this.getPanes(), parent = document.createElement('div');
      parent.id = "rewards";
      angular.forEach(coordinates, function(cd) {
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.className = 'reward-label';
        label.innerText = cd.name;
        div.className = 'reward';
        div.id = cd.name;
        div.appendChild(label);
        div.addEventListener('click', markerClicked);
        parent.appendChild(div);
      });
      panes.overlayMouseTarget.appendChild(parent);
    };

    MallOverlay.prototype.transform = function(div, cd) {
      var overlayProjection = this.getProjection();
      var pt = new google.maps.LatLng(cd.lat, cd.lng);
      var coords = overlayProjection.fromLatLngToDivPixel(pt);
      div.style.left = coords.x + 'px';
      div.style.top = coords.y + 'px';
    };

    MallOverlay.prototype.draw = function(){
      var rewards = document.getElementsByClassName('reward'), that = this;
      angular.forEach(rewards, function(reward) {
        var coords;
        angular.forEach(coordinates, function(cd){if (cd.name === reward.id) coords = cd;});
        that.transform(reward, coords);
      });
    };

    function markerClicked(evt) {
      var delY = (evt.y - 350);
      var projection = overlay.getProjection();
      var center = projection.fromLatLngToDivPixel(map.getCenter());
      var pnt = new google.maps.Point(evt.x, center.y + delY);
      map.panTo(projection.fromContainerPixelToLatLng(pnt));
      $scope.$apply(function(){ $scope.detailStore = evt.target.id || evt.target.innerText; });
      console.log($scope.detailStore);
    }

  }]);