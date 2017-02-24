var fs = require('fs');
const {dialog} = require('electron').remote;


//var jsmediatags = require("jsmediatags");

var ffmetadata = require('ffmetadata')





function writeMetadata(fileName, data){
	
	ffmetadata.write(fileName, data, function(err) {
	    if (err) console.error("Error writing metadata", err);
	    else console.log("Data written");
	});
	
}





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
		
		writeMetadata(fileName,data);
		
	

		
	}); 

}




