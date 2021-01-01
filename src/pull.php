<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="stylesheets/style.css">
<meta charset="utf-8" />
        <meta name="viewport" content="width=device-width">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
</head>

<body>

<script src="pull.js"></script>

<form  

<form  class="MainForm" method="post">
<!-- ************************************* The form contains Folder List and Play button **************************** -->
<div id="container2" >
<p class="LabelWhite">Artist</p>
<select class="select1" size=1 id="FolderListId" select name="FolderList" class="input-xlarge" onChange="ChangeArtist.call(this.value)"; >
<?php
	$directory = 'SetList/'; // THIS ONE ALWAYS SAME
    	$contents=scandir("SetList/");
    	$dirs = array();
	$FoldersList = "";
			
   	foreach (glob($directory . '*', GLOB_ONLYDIR) as $content ) {
        	if(is_dir($content)){
			$FoldersList .= '<option value='.$content.'>'.basename($content).'</option>';
        	}
    	}

	/* Puts the list of Artists into Select Box */
	echo $FoldersList; 
?>
</select>

</div>
<!-- ************************************* This Builds Song List and Play button **************************** -->
<div id="container1">
        <p class="LabelWhite">Song</p>
	<select class="select1" size=1 id="SongListID" name="SongList" class="input-xlarge" value=this.value></select>
	<script src="BuildSongList.js"></script>

	<input class="button1" type="button" onclick="PlaySong()" id="PlayButton" name="play" value="PLAY" />
	<br>
	
	
	<table class="Controls">
	<col width="60%">
	<col width="40%">
	<tr>
	<td><p class="LabelWhite10">Now Playing - Right click for options or press UPDATE to display below</p></td>	
	<td><label class="CheckLabelWhite" for="myCheck">Allow Automatic Update:</label><input type="checkbox" checked="checked"  id="myCheck"></td>
	</tr>
	</table>

	<table class="Controls">
	<col width="60%">
	<col width="40%">
	<tr>
	<td><div id="LinkDiv1" class="LinkButton">.</div></td>
	<td><input class="button1" type="button" onclick="Update()" id="NextButton1" name="next1" value="Update" /></td>
	</tr>
	</table>

	<p class="LabelWhite">Links to Other Song Sheets</p>

	<table class="Controls">
	<col width="50%">
	<col width="50%">
	<!--<col width="33%">-->
	<tr>
	<td class="tdCenter"><input class="button2" type="button"  onclick="GoChordie()" id="ChordieButton" name="Chordie" value="Chordie" /></td>
	<td class="tdCenter"><input class="button2" type="button"  onclick="GoUltimate()" id="UltimateButton" name="Ultimate" value="Ultimate" /></td>
	<!--<td><input class="button2" type="button" style="text-align: center" onclick="Tuner()" id="TuneButton" name="next1" value="Tuner" /></td>-->
	<td>.</td>
	</tr>
	</table>
</div>
<div id="LinkDiv" class="Hidden">.</div>
</form>
<br>
</label>
<!-- *************************************             Put the PDF Here       **************************** -->
<div id="pdf" class="myDiv">PDF Displays Here</div>
</body>
</html>
