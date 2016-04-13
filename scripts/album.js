// Example Album

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var trackUpdate = function(currentSong, nextSong) {
  
  var currentlyPlayingSongElement = $("[data-song-number='" + currentSong + "']" );
  currentlyPlayingSongElement.text(currentSong);

  var currentlyPlayingSongElement = $("[data-song-number='" + nextSong + "']" );
  currentlyPlayingSongElement.html(pauseButtonTemplate);

  currentlyPlayingSongNumber = nextSong;
  currentSongFromAlbum = currentlyPlayingSongElement.next(".song-item-title").text();
  updatePlayerBarSong();
  
}
var nextSong = function () {
  currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
  nextSong = currentSong + 1;
  if (currentSong === currentAlbum.songs.length) {
    nextSong = 1;
  }
  
  trackUpdate(currentSong, nextSong)
 
}

var previousSong = function () {
  currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
  nextSong = currentSong - 1;
  if (currentSong === 1) {
    nextSong = currentAlbum.songs.length;
  }

  trackUpdate(currentSong, nextSong)

}


var updatePlayerBarSong = function() {
  $(".song-name").text(currentSongFromAlbum);
  $(".artist-song-mobile").text(currentSongFromAlbum);
  $('.main-controls .play-pause').html(playerBarPauseButton);
  
}
var createSongRow = function(songNumber, songName, songLength) {
  var template = 
      '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
      
      var $row = $(template);
  
      var clickHandler = function(event) {
        songNumber = parseInt($(this).attr("data-song-number"));
        
        if (currentlyPlayingSongNumber === null) {
          $(this).html(pauseButtonTemplate);
          currentlyPlayingSongNumber = songNumber;
          currentSongFromAlbum = $(this).next(".song-item-title").text();
          updatePlayerBarSong();
        }
        else if (currentlyPlayingSongNumber === songNumber) {
          $(this).html(playButtonTemplate);
          currentlyPlayingSongNumber = null;
          currentSongFromAlbum = null;
          $('.main-controls .play-pause').html(playerBarPlayButton);
        }
        else if (currentlyPlayingSongNumber !== songNumber) {
          var currentlyPlayingSongElement = $("[data-song-number='" + currentlyPlayingSongNumber + "']" );
          currentlyPlayingSongElement.text(currentlyPlayingSongNumber);
          $(this).html(pauseButtonTemplate);
          currentlyPlayingSongNumber = songNumber;
          currentSongFromAlbum = $(this).next(".song-item-title").text();
          updatePlayerBarSong();
     
        }
                      
      }

      var onHover = function(event) {
        songItem = $(this).find(".song-item-number");
        songNumber = parseInt(songItem.attr("data-song-number"));
        if (this.className === 'album-view-song-item') {
        
          if (songNumber !== currentlyPlayingSongNumber) {
           songItem.html(playButtonTemplate);
          }
        }
        
      };
      var offHover = function(event) {
         songItem = $(this).find(".song-item-number");
         songNumber = parseInt(songItem.attr("data-song-number"));
         if (this.className === 'album-view-song-item') {
        
          if (songNumber !== currentlyPlayingSongNumber) {
            songItem.text(songItem.attr("data-song-number"));
          }
         }
        
      };
  
      $row.find('.song-item-number').click(clickHandler);
  
      $row.hover(onHover, offHover);
  
      return $row;
};

var setCurrentAlbum = function(album) {
  
   var $albumTitle = $('.album-view-title');
   var $albumArtist = $('.album-view-artist');
   var $albumReleaseInfo = $('.album-view-release-info');
   var $albumImage = $('.album-cover-art');
   var $albumSongList = $('.album-view-song-list');

  currentAlbum = album;
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);
  

  $albumSongList.empty();
  
  
  for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i+1,album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow)
  }
};

var trackIndex = function(album, song) {
     //return album.songs.indexOf(song);
  for (var i = 0; i < album.songs.length; i++) {
    if (album.songs[i].title === song) {
      currentIndex = i;
    }
  }
  
  return (currentIndex + 1)

 };

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  
});



