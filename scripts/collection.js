var buildCollectionItemTemplate = function() {
  var template = 
    '<div class="collection-album-container column fourth">'
  + ' <img src="{{site.baseurl }}/assets/images/album_covers/01.png"/>'
  + ' <div class="collection-album-info caption">'
  + '   <p>'
  + '      <a class="album-name" href="{{site.baseurl }}/album.html"> The Colors </a>'
  + '      <br/>'
  + '      <a href="{{site.baseurl }}/album.html"> Pablo Picasso </a>'
  + '      <br/>'
  + '      X songs'
  + '      <br/>'
  + '   </p>'
  + ' </div>'
  + '</div>'
;
  
  return $(template);
};


$(window).load(function() {
  
  var $collectionContainer = $('.album-covers');
  
  $collectionContainer.empty();
  
  for (var i = 0; i < 12; i++) {
    var $newThumbnail = buildCollectionItemTemplate();
    
    $collectionContainer.append($newThumbnail);
    
  }
    
});