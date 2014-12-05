/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

/**
 * Geolocate Button Control.  Implements the Geolocate Button OpenLayers
 * Control.
 */
Drupal.openlayers.addBehavior('openlayers_behavior_geolocate_button', function (data, options) {

  // Create new panel control and add.
  var geolocatePanel = new OpenLayers.Control.Panel({
    displayClass: 'openlayers_behavior_geolocate_button_panel'
  });
  data.openlayers.addControl(geolocatePanel);

  // Create toggling control and bcutton.
  var toggler = OpenLayers.Function.bind(
    Drupal.openlayers.geolocateToggle, data, data, options);
  var button = new OpenLayers.Control.Button({
    displayClass: 'openlayers_behavior_geolocate_button',
    title: Drupal.t('Geolocate'),
    trigger: toggler
  });
  geolocatePanel.addControls([button]);
});

/**
 * Toggling function for geolocate control.
 */
Drupal.openlayers.geolocateToggle = function (data, options) {

  // Create Geolocate control
  var geolocate = new OpenLayers.Control.Geolocate(options);
  data.openlayers.addControl(geolocate);

  // Do not watch for changes to the location.
  geolocate.watch = false;

  // Add some event handling
  geolocate.events.register('locationupdated', this, function(e) {
    data.openlayers.setCenter(new OpenLayers.Geometry.Point(e.point.x, e.point.y), options.zoom_level);
  });
  geolocate.events.register('locationfailed', this, function(e) {
    OpenLayers.Console.log(Drupal.t('Location detection failed'));
  });

  // Activate!
  geolocate.activate();
};