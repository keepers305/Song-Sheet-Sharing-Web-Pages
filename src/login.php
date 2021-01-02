<html>

<style>
input[type=text] {
  position: relative;
  margin-left:50px;
  background-color: white;
  border: solid;
  border-color: black;
  border-radius: 15px;
  font-size: 34px;
  color: #000000;
  padding: 20px;
  width: 250px;
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}

.button1 {
  position: relative;
  margin-left:50px;
  background-color: #cc3300;
  border: solid;
  border-color: white;
  border-radius: 15px;
  font-size: 34px;
  color: #FFFFFF;
  padding: 20px;
  width: 200px;
  text-align: center;
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}

</style>

<body>

<form method="POST">
  <?php if( $_SERVER['REQUEST_METHOD'] == 'POST' ) { ?>
    Invalid password
  <?php } ?>
  <p>Enter password for access:</p>
  <input type="text" class="input" name="password">
  <button class="button1" type="submit">Submit</button>
</form>

</body>
</html>