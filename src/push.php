<?php
// start a session
session_start();
 
// manipulate session variables
?>

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

<?php
require_once 'protect.php';
Protect\with('login.php', 'JAMLEADERPASSWORD');
?>

<script src="push.js"></script>

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
	<!--<input type="text" id="HostingId" name="Password" value="<?php echo $_SESSION['IsHost']; ?>" />-->
	<input class="button1" type="button" onclick="PreviewSong()" id="PreviewButton" name="Preview" value="PREVIEW" />

</div>
<!-- ************************************* This Builds Song List and Play button **************************** -->
<div id="container1">
        <p class="LabelWhite">Song</p>
	<select class="select1" size=1 id="SongListID" name="SongList" class="input-xlarge" value=this.value></select>
	<script src="BuildSongList.js">
	</script>

	<input class="button1" type="button" onclick="PostSong()" id="PlayButton" name="play" value="SHARE" />
	<br>

	<p class="LabelWhite">Now Sharing</p>

	<table class="Controls">
	<col width="60%">
	<col width="40%">
	<tr>
	<td><div id="LinkDiv1" class="LinkButton" >.</div></td>
	</tr>
	</table>

	<p class="LabelWhite">Links to Other Song Sheets</p>

	<table class="Controls">
	<col width="33%">
	<col width="33%">
	<col width="33%">
	<tr>
	<td><input class="button2" type="button"  onclick="GoChordie()" id="ChordieButton" name="Chordie" value="Chordie" /></td>
	<td><input class="button2" type="button"  onclick="GoUltimate()" id="UltimateButton" name="Ultimate" value="Ultimate" /></td>
	<td><input class="button2" type="button"  onclick="Tuner()" id="TuneButton" name="next1" value="Tuner1" /></td>
	</table>

</div>
<div id="LinkDiv" class="Hidden" >.</div>
</form>
<br>
<!-- *************************************             Put the PDF Here       **************************** -->
<div id="pdf" class="myDiv">PDF Displays Here</div>
</body>
</html>
