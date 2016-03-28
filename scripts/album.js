// Example Album

var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
  
};

// Another Example Album
 var albumJourney = {
     title: 'Escape',
     artist: 'Journey',
     label: 'CBS Records International',
     year: '1981',
     albumArtUrl: 'assets/images/album_covers/journey.jpeg',
     songs: [
         { title: 'Don\'t Stop Believin', duration: '4:11' },
         { title: 'Stone in Love', duration: '4:26' },
         { title: 'Who\'s Crying Now', duration: '5:01'},
         { title: 'Keep on Runnin', duration: '3:40' },
         { title: 'Still They Ride', duration: '3:50'},
         { title: 'Escape', duration: '5:17'},
         { title: 'Lay It Down', duration: '4:13'},
         { title: 'Dead or Alive', duration: '3:21'},
         { title: 'Mother, Father', duration: '5:29'},
         { title: 'Open Arms', duration: '3:23'}
     ]
 };

// Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
  var template = 
      '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
      
      return template;
};

var setCurrentAlbum = function(album) {
  //#1
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
  
  // #2
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);
  
  // #3
  albumSongList.innerHTML = '';
  
  // #4
  for (var i = 0; i < album.songs.length; i++) {
      albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
};

window.onload = function() {
  setCurrentAlbum(albumPicasso);
};

//var albumImage = document.getElementsByClassName('album-cover-art')[0];
  //document.images[i].addEventListener("click", MakeMove, false);

// window.addEventListener('scroll', function(event) {
//         console.log(event);
//     });


document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function(event) {

 //  title: 'The Colors',  title: 'Escape', title: 'The Telephone',
 
//  1 albumPicasso
//  2 albumJourney
//  3 albumMarconi
  
  
  var current_album = document.getElementsByClassName('album-view-title')[0].firstChild.nodeValue;
  switch(current_album){
  case albumPicasso.title:
    setCurrentAlbum(albumJourney);
    break;
  case albumJourney.title:
    setCurrentAlbum(albumMarconi);
    break;
  case albumMarconi.title:
    setCurrentAlbum(albumPicasso);
    break;
  default:
   setCurrentAlbum(albumPicasso);
   break;
  };
 
  
});





