/************************************** New Artist was Selected  ******************************************/
    	function ChangeArtist() {
   		var SelectedArtist = document.getElementById('FolderListId');
		CreateSongList(encodeURI(SelectedArtist.value));
   		return;
    	}

/********************************* Create List of Songs for Selection  *************************************/

	function successCallBack(ResultCSV) {
		var SongArray = ResultCSV.split(',');

		document.getElementById("SongListID").options.length = 0;
		var select = document.getElementById("SongListID");
		for(i in SongArray) {
			i++;
			SongArray[i] = SongArray[i].replace(/"/g, "");
			SongArray[i] = SongArray[i].replace(/]/g, "");  
			SongArray[i] = SongArray[i].replace(/\r?\n|\r/g, "");
    			option = document.createElement( 'option' );
    			option.value = option.text = SongArray[i];
    			select.add( option );
		}
		return;
    	}


    	function CreateSongList(Artist) {
		var directory = Artist + "/";
		var extension = '.pdf';
		var i=0;
		
		/* Get the ARRAY of SONGS from the ARTIST's DIRECTORY */
		jQuery.ajax({
			type: 'POST',
			url: 'UpdateSongList.php',
			dataType: 'HTML',
			data: { "field1": encodeURI(directory)},
			success: function (response) {
				successCallBack(response);
			},
			error: function () {
				alert("error in ajax");
			}
		});
		return;
        }


/********************************** PlaySong() &  Write to File Dispay PDF *************************************/
   function successCallBack1(pdfstring) {
	document.getElementById('pdf').innerHTML = pdfstring;
	return;
   }

    function PlaySong() {
	//var password = document.getElementById('PasswordInputId').value;

   	var SelectedArtist = document.getElementById('FolderListId');
	var directory = encodeURI(SelectedArtist.value);
	var NextSongArr = directory.split('/');
	directory = NextSongArr[1];

	var SelectedSong = document.getElementById('SongListID').value;

	/* Update the Link to Now Playing */
	document.getElementById('LinkDiv1').innerHTML= '<a href="https://305Keepers.com/SetList/' + directory + '/' + SelectedSong + '">'+ SelectedSong + '</a>';
	document.getElementById('LinkDiv').innerHTML= directory + ',' + SelectedSong;

		jQuery.ajax({
			type: 'POST',
        		cache    : false,
			url: 'PlaySong.php',
			dataType: 'HTML',
			data: { "field1": encodeURI(directory), "field2": SelectedSong, "field3": "pull"},

			success: function (response) {
				successCallBack1(response);
			},
			error: function () {
				alert("error in ajax");
			}
		});

		return;
    }

/**************************************** Update() ****************************************/
    
   function successCallBack2(pdfstring) {
	document.getElementById('pdf').innerHTML = pdfstring;
	return;
   }

    function Update(){

	TheNextSong = document.getElementById('LinkDiv').innerHTML; //Get this from href instead
	var SongArr = TheNextSong.split(',');
	var directory = SongArr[0];
	var NextSong = SongArr[1];

		jQuery.ajax({
			type: 'POST',
        		cache    : false,
			url: 'PlaySong.php',
			dataType: 'HTML',
			data: { "field1": directory, "field2": NextSong, "field3": "pull"},
			success: function (response) {
				successCallBack2(response);
			},
			error: function () {
				alert("error in ajax!");
			}
		});
		return;
    }

/**************************************** Auto Refresh ****************************************/
    var myVar = setInterval(UpDateNowPlaying, 5000);  // 5000 millisecons, or 5 sec

    function successCallBack3(ArtistSong) {
	var SongArr = ArtistSong.split(',');
	var directory = SongArr[0];
	var NextSong = SongArr[1];
  	var checkBox = document.getElementById("myCheck");

	OldArtistSong = document.getElementById('LinkDiv').innerHTML

	//alert (OldArtistSong + '/' + ArtistSong);

	/* When Automatic is Checked and new song is playing */
  	if (checkBox.checked == true){
		if (ArtistSong != OldArtistSong){
			var pdflink = 'SetList/' + directory + '/' + NextSong;
			document.getElementById('pdf').innerHTML = '<iframe class="pdfFrameStyle" height="900px" width="100%" src="' + pdflink + '#toolbar=0&navpanes=0" name="pdfframe"></iframe>';
		}
	}	
	
	document.getElementById('LinkDiv').innerHTML= directory + ',' + NextSong;
	document.getElementById('LinkDiv1').innerHTML= '<a href="https://305Keepers.com/SetList/' + directory + '/' + NextSong + '">'+ NextSong + '</a>';
	return;
   }

    function UpDateNowPlaying(){
	jQuery.ajax({
		type: 'POST',
        	cache    : false,
		url: 'UpdateSongFromFile.php',
		dataType: 'HTML',
		/* Get back Artist, Song */
		success: function (response) {
			successCallBack3(response);
		},
		error: function () {
			alert("error in ajax!");
		}
	});
	return;
    }

<!-- ************************************* Other Sites **************************** -->
    function GoChordie() {
	document.getElementById("myCheck").checked = false;
	document.getElementById('pdf').innerHTML = '<iframe class="pdfFrameStyle" height="900px" width="100%" src="https://www.chordie.com/" name="pdfframe"></iframe>';   
        return;
    }

    function GoUltimate() {
	document.getElementById("myCheck").checked = false;
        document.getElementById('pdf').innerHTML = '<iframe class="pdfFrameStyle" height="900px" width="100%" src="https://www.ultimate-guitar.com/explore/" name="pdfframe"></iframe>';   
        return;
    }

<!-- ************************************* Tuner **************************** -->

    function Tuner() {
	document.getElementById("myCheck").checked = false;
        document.getElementById('pdf').innerHTML = '<iframe class="pdfFrameStyle" height="900px" width="100%" src="https://www.gieson.com/Library/projects/utilities/tuner/" name="pdfframe"></iframe>';
        return;
    }

