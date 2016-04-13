// Example Album

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var currentSoundFile = null;
var currentVolume = 80;

// Store state of playing songs
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $buttonbar_PlayPause= $('.main-controls .play-pause') 

var setSong = function(songNumber) {
  if (currentSoundFile) {
    currentSoundFile.stop();
  }
  if (songNumber !== null) {
    var currentlyPlayingSongElement = $("[data-song-number='" + songNumber + "']" );
    //currentSongFromAlbum = currentlyPlayingSongElement.next(".song-item-title").text();
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentlyPlayingSongNumber = songNumber;
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
      formats: [ 'mp3' ],
      preload: true
    });
    setVolume(currentVolume);
  }
  else {
    currentlyPlayingSongNumber = null;
    currentSongFromAlbum = null;
  }
  
   
};

var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 };

var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var trackUpdate = function(currentSong, nextSong) {
  
  var currentlyPlayingSongElement = $("[data-song-number='" + currentSong + "']" );
  currentlyPlayingSongElement.text(currentSong);

  var currentlyPlayingSongElement = $("[data-song-number='" + nextSong + "']" );
  currentlyPlayingSongElement.html(pauseButtonTemplate);
  setSong(nextSong);
  updatePlayerBarSong();
  
}

var nextSong = function () {
  if (currentlyPlayingSongNumber === null) {
    currentSong = 1;
    nextSong = 1;
    trackUpdate(currentSong, nextSong);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
  }
  else {
    currentSoundFile.pause();
    currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
    nextSong = currentSong + 1;
    if (currentSong === currentAlbum.songs.length) {
      nextSong = 1;
    }
    trackUpdate(currentSong, nextSong);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();

  }
 
}

var previousSong = function () {
  
  if (currentlyPlayingSongNumber === null) {
    currentSong = 1;
    nextSong = 1;
    trackUpdate(currentSong, nextSong);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
  }
  else {
    currentSoundFile.pause();
    currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
    nextSong = currentSong - 1;
    if (currentSong === 1) {
      nextSong = currentAlbum.songs.length;
    }
    trackUpdate(currentSong, nextSong)
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();

  }

}


var updatePlayerBarSong = function() {
  $(".song-name").text(currentSongFromAlbum.title);
  $(".artist-song-mobile").text(currentSongFromAlbum.title);
  $('.main-controls .play-pause').html(playerBarPauseButton);
  
}

var togglePlayFromPlayerBar = function() {
  if (currentSoundFile) {
    if (!currentSoundFile.isPaused()) {
      var currentlyPlayingSongElement = $("[data-song-number='" + currentlyPlayingSongNumber + "']" );
      currentlyPlayingSongElement.html(playButtonTemplate);
      //setSong(null);
      currentSoundFile.pause();
      updateSeekBarWhileSongPlays();
      $('.main-controls .play-pause').html(playerBarPlayButton);
    } 
    else {
      var currentlyPlayingSongElement = $("[data-song-number='" + currentlyPlayingSongNumber + "']" );
      currentlyPlayingSongElement.html(pauseButtonTemplate);
      setSong(currentlyPlayingSongNumber);
      currentSoundFile.play()
      updateSeekBarWhileSongPlays();
      updatePlayerBarSong();
    }
  }
  else {
      setSong(1);
      var currentlyPlayingSongElement = $("[data-song-number='" + currentlyPlayingSongNumber + "']" );  
      currentlyPlayingSongElement.html(pauseButtonTemplate);
      currentSoundFile.play();
      updateSeekBarWhileSongPlays();
      updatePlayerBarSong();
  }
  
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
          setSong(songNumber);
          currentSoundFile.play()
          updateSeekBarWhileSongPlays();
          updatePlayerBarSong();
         
        }
        else if (currentlyPlayingSongNumber === songNumber) {
          $(this).html(playButtonTemplate);
//          currentSoundFile.isPaused
          setSong(null);
          currentSoundFile.pause();
          updateSeekBarWhileSongPlays();
          updatePlayerBarSong();
          $('.main-controls .play-pause').html(playerBarPlayButton);
        }
        else if (currentlyPlayingSongNumber !== songNumber) {
          var currentlyPlayingSongElement = $("[data-song-number='" + currentlyPlayingSongNumber + "']" );
          currentlyPlayingSongElement.text(currentlyPlayingSongNumber);
          $(this).html(pauseButtonTemplate);
          //currentSoundFile.stop()
          setSong(songNumber);
          currentSoundFile.play()
          updateSeekBarWhileSongPlays();
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
     return (album.songs.indexOf(song) + 1);
};


var updateSeekBarWhileSongPlays = function() {
  if (currentSoundFile) {
    currentSoundFile.bind('timeupdate', function(event) {
      var seekBarFillRatio = this.getTime() / this.getDuration();
      var $seekBar = $('.seek-control .seek-bar');
      updateSeekPercentage($seekBar, seekBarFillRatio);
    });
  }
};


var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
  var offsetXPercent = seekBarFillRatio * 100;
  
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);

  var percentageString = offsetXPercent + '%';
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
  var $seekBars = $('.player-bar .seek-bar');
 
  $seekBars.click(function(event) {
  
    var offsetX = event.pageX - $(this).offset().left;
    var barWidth = $(this).width();

    var seekBarFillRatio = offsetX / barWidth;
    
    parentName = $(this).parent().attr("class");
    if (parentName == "seek-control") {
      seek(seekBarFillRatio * currentSoundFile.getDuration());
    }
    else {
      setVolume(seekBarFillRatio * 100);
    };
    
    updateSeekPercentage($(this), seekBarFillRatio);
   });
  
  $seekBars.find('.thumb').mousedown(function(event) {

  var $seekBar = $(this).parent();

  $(document).bind('mousemove.thumb', function(event){
    var offsetX = event.pageX - $seekBar.offset().left;
    var barWidth = $seekBar.width();
    var seekBarFillRatio = offsetX / barWidth;
    updateSeekPercentage($seekBar, seekBarFillRatio);
    });

    $(document).bind('mouseup.thumb', function() {
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
     });

  });
  

};

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  setupSeekBars();
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $buttonbar_PlayPause.click(togglePlayFromPlayerBar)
 
});



