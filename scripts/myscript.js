var fs = require('fs');
const {dialog} = require('electron').remote;

var $ = require('jquery');
var ffmetadata = require('ffmetadata')




	

//function saveFile(url) {
//	$.ajax({
//        url: url,
//        success: function (response) {
//        	
//        }
//     });
//}


function writeMetadata(fileName, data){
	
	ffmetadata.write(fileName, data, function(err) {
	    if (err) console.error("Error writing metadata", err);
	    else console.log("Data written");
	});
	
}




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
        	var album_cover = object[0].album.images[0].url;
        	var artist_name = object[0].artists[0].name;
        	console.log(title + " "+ album_title + " " + album_cover + " " + artist_name);
        
        	var data = {
        			album:album_title,
        			artist: artist_name,
        			title: title	
        	};
        	
        	var options = {
        			attachments:[album_cover],// ["/home/lucky/background/35HgtBp.jpg"],
        			 'id3v2.3' : true
        	};
        	
        	ffmetadata.write(fileName, {}, options, function(err) {
        	    if (err) console.error("Error writing cover art" + err);
        	    else console.log("Cover art added");
        	});
        	//saveFile(album_cover);	
        	//writeMetadata(fileName,data, options);		
        	
        	
        	
        }
    });
};







function openFile () {

	dialog.showOpenDialog(function (fileNames) {

		if (fileNames === undefined) return;
		var fileName = fileNames[0];
		console.log(fileName);
		ffmetadata.read(fileName, function(err,data) {
		    if (err) console.log(err);
		    else console.log(data);
		});
		
		//function for communicate with spotify
		var data = {
				album:"NONE"
		};
		

		title = fileName.substring(fileName.search(/[a-zA-Z s è é ò à _ . ,]+.mp3/), fileName.length -4);
		console.log(title);
		track_spotify(title, fileName);
		//writeMetadata(fileName,data);
	

		
	}); 

}




