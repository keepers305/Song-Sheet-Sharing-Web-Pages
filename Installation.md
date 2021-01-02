Here are some steps that you will need to perform after uploading the files

1. In push.js, create a unique key in this line of function `PostSong()`

   ```js
   data: { "field1": encodeURI(directory), "field2": SelectedSong, "field3": "UNIQUEKEY"},
   ```

2.  In PlaySong.php, create a unique key that matches the one in

    ```php
    if ( $JamJockeyKey == " UNIQUEKEY ")
    ```

> The above is a very weak method of limiting access the playsong functionality. The better solution will be in the security headwrs that I am adding to my httpd.conf now


3. At the top of push.php just below the `<body>` tag, change the Jam Leader password

   ```php
   <body>

   <?php
   require_once 'protect.php';
   Protect\with('login.php', 'JAMLEADERPASSWORD');
   ?>
   ```

4. Create a folder called “Setlist” in the htdocs folder.
5. `sudo chgrp daemon links.txt`
6. `Chown 774 links.txt`
7. Backup your httpd.conf or your entire environment before messing with httpd.conf
8. In the DocumentRoot section of httpd.conf file, add `Options –Indexes`

   ```conf
   DocumentRoot "/opt/bitnami/apache2/htdocs"
   <Directory "/opt/bitnami/apache2/htdocs">
   #
   # Possible values for the Options directive are "None", "All",
   # or any combination of:
   # Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews
   #
   # Note that "MultiViews" must be named *explicitly* --- "Options All"
   # doesn't give it to you.
   #
   # The Options directive is both complicated and important. Please see
   # http://httpd.apache.org/docs/2.4/mod/core.html#options
   # for more information.
   #
   Options Indexes FollowSymLinks
   Options –Indexes
   ```

9. For now, remove spaces from directory names.