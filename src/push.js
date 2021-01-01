/************************************** New Artist was Selected  ******************************************/
/* The user selected an artist. Now call function to update the song dropdown  from that directory        */
    	
        function ChangeArtist() {
   		var SelectedArtist = document.getElementById('FolderListId');
		CreateSongList(encodeURI(SelectedArtist.value));
   		return;
    	}

/********************************* Create List of Songs for Selection  *************************************/
/* When the ajax query has returned, CreateSongList() calls this to populate the select box                */
/* Remove some problematic characters - This needs some work for case when char not present                */ 

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

/* Call php with artist name and expect to get back comma separated array of songs.                        */

    	function CreateSongList(Artist) {
		var directory = Artist + "/";
		var extension = '.pdf';
		var i=0;

		//alert('CREATE SONG LIST');
		
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


/********************************** PreviewSong() &  Write to File Dispay PDF *************************************/
/* When Preview is selected, the Jam leader sees new pdf, but it is not posted for Jammers                        */
/* Again a call back function is used to receive result of PreviewSong() when it is available                     */
/* Field 3 of pull indicates Preview                                                                              */

   function successCallBack5(pdfstring) {
        //alert(pdfstring);
	//document.write(pdfstring);
	document.getElementById('pdf').innerHTML = pdfstring;
	return;
   }

    function PreviewSong() {

   	var SelectedArtist = document.getElementById('FolderListId');
	var directory = encodeURI(SelectedArtist.value);
	var NextSongArr = directory.split('/');
	directory = NextSongArr[1];

	var SelectedSong = document.getElementById('SongListID').value;

		/* Play the Song and DO NOT Post JamJockey Key */
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



/********************************** PlaySong() &  Write to File Dispay PDF *************************************/
/* Password required to post a new song - Not effective. Need to fix this                                      */

   function successCallBack1(pdfstring) {
        //alert(pdfstring);
	//document.write(pdfstring);
	document.getElementById('pdf').innerHTML = pdfstring;
	return;
   }

    function PostSong() {
	//var password = document.getElementById('PasswordInputId').value;

   	var SelectedArtist = document.getElementById('FolderListId');
	var directory = encodeURI(SelectedArtist.value);
	var NextSongArr = directory.split('/');
	directory = NextSongArr[1];

	var SelectedSong = document.getElementById('SongListID').value;

	/* Update the Link to Now Playing */
	document.getElementById('LinkDiv1').innerHTML= '<a href="https://305Keepers.com/SetList/' + directory + '/' + SelectedSong + '">'+ SelectedSong + '</a>';
	document.getElementById('LinkDiv').innerHTML= directory + ',' + SelectedSong;


		/* Play the Song and Post if JamJockey Key */
		jQuery.ajax({
			type: 'POST',
        		cache    : false,
			url: 'PlaySong.php',
			dataType: 'HTML',
			//data: { "field1": encodeURI(directory), "field2": encodeURI(SelectedSong), "field3": password},
			//data: { "field1": encodeURI(directory), "field2": SelectedSong, "field3": password},
			data: { "field1": encodeURI(directory), "field2": SelectedSong, "field3": "CreatedACODE"},

			success: function (response) {
				successCallBack1(response);
			},
			error: function () {
				alert("error in ajax");
			}
		});

		return;
    }


/**************************************** Auto Refresh ****************************************/
/* Call Update Now Playing every 5 seconds for new artist, song combination                   */
/* This is taken from the Jammers pull funcionality when I was tryign to combine the two      */
/* Not so sure it is needed now                                                               */ 

    //var myVar = setInterval(UpDateNowPlaying, 5000);  // 5000 millisecons, or 5 sec

    function successCallBack3(ArtistSong) {
	var SongArr = ArtistSong.split(',');
	var directory = SongArr[0];
	var NextSong = SongArr[1];
	document.getElementById('LinkDiv').innerHTML= directory + ',' + NextSong;
	document.getElementById('LinkDiv1').innerHTML= '<a href="https://305Keepers.com/SetList/' + directory + '/' + NextSong + '">'+ NextSong + '</a>';
	return;
   }

    function UpDateNowPlaying(){

	jQuery.ajax({
		//type: 'POST',
        	//cache    : false,
		//?url: 'UpdateSongFromFile.php',
		//dataType: 'HTML',
		/* Get back Artist, Song */
		//success: function (response) {
			//successCallBack3(response);
		//},
		//error: function () {
			//alert("error in ajax!");
		//}
	});
	return;
    }

<!-- ************************************* Other Sites **************************** -->
    function GoChordie() {
	document.getElementById('pdf').innerHTML = '<iframe class="pdfFrameStyle" height="900px" width="100%" src="https://www.chordie.com/" name="pdfframe"></iframe>';   
        return;
    }

    function GoUltimate() {
        document.getElementById('pdf').innerHTML = '<iframe class="pdfFrameStyle" height="900px" width="100%" src="https://www.ultimate-guitar.com/explore/" name="pdfframe"></iframe>';   
        return;
    }

<!-- ************************************* Tuner **************************** -->

    function Tuner() {
        document.getElementById('pdf').innerHTML = '<iframe class="pdfFrameStyle" height="900px" width="100%" src="https://www.gieson.com/Library/projects/utilities/tuner/" name="pdfframe"></iframe>';
        return;
    }
