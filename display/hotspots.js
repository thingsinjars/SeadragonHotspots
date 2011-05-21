var info_icon = "img/info_icon.png"; /* This can be anything */
start = function() {
  Seadragon.Config.imagePath = "img/";
  Seadragon.Config.autoHideControls = false;

  viewer = new Seadragon.Viewer("container");
  viewer.openDzi("GeneratedImages/dzc_output.xml");

  viewer.addEventListener("open", addMarkers);
  viewer.addEventListener("animation", updateMarkers);

}


/* markers (this bits you click on) and Overlays (the bits that pop up */
addMarkers = function(viewer) {
  for (var key in data) {
    if(data[key]['zoomMin']==null) {
      var img = document.createElement("img");
      img.src = info_icon;
      var rect = new Seadragon.Rect(data[key]['x'],data[key]['y'],data[key]['w'],data[key]['h']);
      img.className = "overlay";
      img.id=key;
      Seadragon.Utils.addEvent(img, "click", function(e) {var targ = e.target || e.srcElement;createOverlay(viewer, data[targ.id], targ.id);});
      Seadragon.Utils.addEvent(img, "touchstart", function(e) {var targ = e.target || e.srcElement;createOverlay(viewer, data[targ.id], targ.id);});
      Seadragon.Utils.addEvent(img, "mouseup", Seadragon.Utils.stopEvent);
      Seadragon.Utils.addEvent(img, "touchend", Seadragon.Utils.stopEvent);
      Seadragon.Utils.addEvent(img, "touchstart", Seadragon.Utils.stopEvent);
      viewer.drawer.addOverlay(img, rect);
    }
  }
}

updateMarkers = function(viewer) {
  var currentBounds = viewer.viewport.getBounds();
  var currentZoom = viewer.viewport.getZoom();
  for (var key in data) {
    if(data[key]['zoomMin']!=null) {
      if(currentZoom>=data[key]['zoomMin']&&currentZoom<=data[key]['zoomMax']) {
        if(!document.getElementById(key) && !document.getElementById('overlay'+key)) {
          //If this marker isn't already displayed
          var img = document.createElement("img");
          img.src="img/info_icon.png";
          var rect = new Seadragon.Rect(data[key]['x'],data[key]['y'],data[key]['w'],data[key]['h']);
          img.className = "overlay";
          img.id=key;
          Seadragon.Utils.addEvent(img, "click", function(e) {var targ = e.target || e.srcElement;createOverlay(viewer, data[targ.id], targ.id);});
          Seadragon.Utils.addEvent(img, "touchstart", function(e) {var targ = e.target || e.srcElement;createOverlay(viewer, data[targ.id], targ.id);});
          Seadragon.Utils.addEvent(img, "mouseup", Seadragon.Utils.stopEvent);
          Seadragon.Utils.addEvent(img, "touchend", Seadragon.Utils.stopEvent);
          Seadragon.Utils.addEvent(img, "touchstart", Seadragon.Utils.stopEvent);
          viewer.drawer.addOverlay(img, rect);
        }
      } else {
        viewer.drawer.removeOverlay(Seadragon.Utils.getElement(key));
      }
    }
  }
}

createMarker = function(viewer, data) {
}


createOverlay = function(viewer, objectInfo, key) {
  var div = document.createElement("div");
  var point = new Seadragon.Point(objectInfo['x'], objectInfo['y']);
  div.className = "popover";
  div.id = "overlay"+key;
  div.innerHTML = objectInfo['content'];
  var span = document.createElement("span");
  span.innerHTML = '[ close ]';
  span.className = 'closebutton';
  div.appendChild(span);
  Seadragon.Utils.addEvent(span, "click",function() {viewer.drawer.removeOverlay(div);updateMarkers(viewer);});
  Seadragon.Utils.addEvent(span, "touchstart",function() {viewer.drawer.removeOverlay(div);updateMarkers(viewer);});
  Seadragon.Utils.addEvent(div, "mouseup", Seadragon.Utils.stopEvent);
  Seadragon.Utils.addEvent(div, "touchend", Seadragon.Utils.stopEvent);
  viewer.drawer.addOverlay(div, point, objectInfo['placement']);
}




Seadragon.Utils.addEvent(window, "load", start);