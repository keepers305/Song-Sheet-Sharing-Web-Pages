<?php

        /* Make sure the path to the file that holds the last link exists */
	$file_path = "links.txt";
	if ( !file_exists($file_path) ){
    		printf ("ERROR - File Does Not Exist");
	}
	else
	{
		/* Update the file with the new Path to selected Song */
		$file_handle = fopen($file_path, 'r'); 
		$ArtistSong = fread($file_handle,filesize($file_path));
		fclose($file_handle);
		echo $ArtistSong;
	}	
?>
