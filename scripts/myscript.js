var nodeID3 = require('node-id3');
var fs = require('fs');
const {dialog} = require('electron').remote;
var request = require('request');
var $ = require('jquery');



var track_spotify = function (query, fileName) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track',
            limit: 1
        },
        success: function (response) {
            //resultsPlaceholder.innerHTML = template(response);
        	var object = response.tracks.items;
        	var id = object[0].id;
        	var title = object[0].name;
        	var album_title = object[0].album.name;
        	var album_cover = object[0].album.images[1].url;
        	var artist_name = object[0].artists[0].name;
        	console.log(title + " "+ album_title + " " + album_cover + " " + artist_name);
        
        	var data = {
        			album:album_title,
        			artist: artist_name,
        			title: title	
        	};
        
        	        

        	request(album_cover).pipe(fs.createWriteStream(__dirname + 'cover.png'));
        	
        	var tags = {
        			  title: title,
        			  artist: artist_name,
        			  album: album_title,
        			  image: album_cover
        			}
        	nodeID3.removeTags(fileName);
        	var success = nodeID3.write(tags, fileName);
        	 
        	//returns true if written correctly
        	console.log(success);
        	
        	
        	

        	
        }
    });
};







function openFile () {

	dialog.showOpenDialog(function (fileNames) {

		if (fileNames === undefined) return;
		var fileName = fileNames[0];
		console.log(fileName);
		
		//espressione regolare sbagliata!!
		title = fileName.substring(fileName.search(/[a-zA-Z s è é ò à _ . ,]+.mp3/), fileName.length -4);
		console.log(title);
		track_spotify(title, fileName);
	

		
	}); 

}




