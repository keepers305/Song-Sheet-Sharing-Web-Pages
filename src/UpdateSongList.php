<?php

//ob_start();
	//header('Content-Type: application/json');
	
    //if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    //if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    //if( !isset($aResult['error']) ) {
		
		$directory = $_POST['field1'];
		$extension = '.pdf';

		$i = 0;
		
		$SelectList = array();

		if ( file_exists($directory) ) {
  			$SelectList[$i++] = 'Select a Song';
   			foreach (glob($directory . '*' . $extension) as $file ) {
				$SelectList[$i++] = basename($file);				
   			}
		
			/* POPULATE THE LIST */
   			echo json_encode($SelectList);
		}
		else { echo 'directory ' . $directory . ' doesn\'t exist!';}
    //}
	
	
?>





