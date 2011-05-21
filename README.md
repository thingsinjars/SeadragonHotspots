Seadragon AJAX Hotspots
=======================

The [Seadragon AJAX library](http://gallery.expression.microsoft.com/SeadragonAjax) is a fantastic way to display large images in great detail. Within the Deep Zoom Composer (the official tool for creating Deep Zoom collections), you can add hotspots to highlight particular areas of your image.

Unfortunately, when you export this as Seadragon AJAX (as opposed to Silverlight), there is no easy way to display your hotspots. The information is output in the scene.xml file contained within GeneratedImages but there is no actual markers and overlays mechanism. The official recommendation is to write your own. Rather than make everyone do this themselves, I've put together this project which will:

  1. Convert the scene.xml into a much smaller JSON file containing just the marker info
  2. Provide a few basic JS functions to add markers and overlays
  3. Provide some basic styling to these markers and overlays

This should be enough to get anyone started and still provide room for developers to tweak things however they like.

Note: it would be quite easy to rewrite things so that the scene.xml is parsed live and you don't need to do the intermediate data.js parsing step but the file is much larger (about 40x) than you need and it's a lot of data to go through on every page load.

The instructions here are also available visually on the included seadragon-instructions.png image.

Creating hotspots
=================
Within the compose screen of Deep Zoom Composer, add your hotspots (use the 'Add hotspot' button on the left-hand side within the images panel). Enter the text you want to appear on the overlay into the 'Tooltip' field (bottom right in the default layout)

Export the project as Custom > Seadragon Ajax

Converting
==========
Within this project, open the tools/parse.html file in a browser.

In the folder created by Deep Zoom Composer, there will be a GeneratedImages folder. Within that, there is a scene.xml file. Open this in a text editor, copy and paste the contents into the top textarea in the parse.html page. You can change the minimum and maximum zoom levels for the markers. Outside this range, you will only see the image, not the hotspots. Press 'Parse' to generate the JSON version of the data. Copy this and save it as 'data.js' in the display folder. 

_If the data you're pasting in doesn't look similar to the dummy data already in that file, you've done something wrong._

Displaying
==========
The display folder is a self-contained instance of Seadragon Ajax. Once you've updated the data.js file, copy your GeneratedImages file in here, replacing the folder already there. Open the index.html in a browser and you'll see your image. Zoom in past your minimum zoom level and you'll see the markers. The image for the markers can be defined in the first line of hotspots.js