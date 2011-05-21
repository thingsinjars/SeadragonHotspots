$('#parse').click(function() {
  var data = {},
      namespace = ($.support.htmlnamespaces ? 'm\\:' : '');
  $('<div/>')
    .html($('#scene_src').val())
    .find(namespace + 'AdItem')
    .not(':first')
    .each(function(i, e) {
      var hotspot = $(this);
      var output = {
        x         : +hotspot.attr('x'),
        y         : Math.pow(hotspot.attr('y'),2)+0.05, /* For some reason, these values are squared */
        w         : 0.01,
        h         : 0.01,
        zoomMin   : +$('#zoomMin').val(),
        zoomMax   : +$('#zoomMax').val(),
        content   : hotspot.attr('p:mytooltipservice.tooltip'),
        placement : 'Seadragon.OverlayPlacement.CENTER'
        }
      data['Hotspot' + i] = output;
  });
  $('#scene_dst').text('data = ' + JSON.stringify(data));
  return false;
});


// Testing support for proper namespaced elements:
// http://bugs.jquery.com/ticket/4208
$(function() {
  $.support.htmlnamespaces = $('<div/>').html('<a:bc/>').find('a\\:bc').length;
});

