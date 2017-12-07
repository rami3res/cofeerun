(function(window) {
  'use strict';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;

  var myTruck = new Truck('Millenium Falcon', new DataStore());
  window.myTruck = myTruck;
})(window);

