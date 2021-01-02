<?php

	$directory = $_POST['field1'];
	$song = $_POST['field2'];
	$JamJockeyKey = $_POST['field3'];

	$SongWithPath  = 'SetList/'.$directory.'/'.$song;

	if ( !file_exists($SongWithPath) ){
    		printf ("ERROR - The requested song - ".$SongWithPath." - is not in the library");
	}


        	/* Make sure the path to the file that holds the last link exists */
		$file_path = "links.txt";
		if ( !file_exists($file_path) ){
    			printf ("ERROR - File Does Not Exist");
		}
		else
		{
			/* If JamJockey, opdate the file with the new Path to selected Song */
			if ( $JamJockeyKey == "CreatedACODE"){
				/* Update the file with the new Path to selected Song */
				$file_handle = fopen($file_path, 'w'); 
				fwrite($file_handle, $directory.','.$song);
				fclose($file_handle);
			}

 			/* SHOW PDF INLINE - This just sends back the string. It does not display*/
			echo '<iframe class="pdfFrameStyle" height="900px" width="100%" src="'.$SongWithPath.'#toolbar=0&navpanes=0" name="pdfframe"></iframe>';
			//error_log('<iframe class="pdfFrameStyle" height="900px" width="100%" src="'.$SongWithPath.'#toolbar=0&navpanes=0" name="pdfframe"></iframe>');

		}
?>
