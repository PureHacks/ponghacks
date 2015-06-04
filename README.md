# Pong Hacks

## Stack

* MySQL
* Express
* Angular
* Node

### Tools & Libraries

* [GulpJS](https://github.com/gulpjs/gulp)
* [Socket.io](https://github.com/Automattic/socket.io)
* [AsyncJS](https://github.com/caolan/async)

## Getting started

* Install dependencies

	```
	sudo npm install
	```

* Start node server

	```
	node server/server.js
	```

* Open browser

	```
	localhost:8888
	```

### Local MySQL development

* Start a MAMP server with MySQL on port 8889

* Open [phpMyAdmin](http://localhost/MAMP/index.php?page=phpmyadmin&language=English)

* In the SQL tab paste the contents of `createDatabase.sql` and hit "Go"

* Reload the navigation panel and verify PongHacks has been created

* Create `key.js` in the `/server` directory with the following contents:

	```
	module.exports = {auth_token: "XXXXXXX-PersonalAPIkey"};
	```

	Your personal token can be retrieved from [your Razorfish Hipchat account](https://hipchat.tor.razorfish.com/account/api)

* Parse the users from Razorfish hipchat server and populate the MySQL DB

	```
	node services/updateUsers.js
	```

	You need a valid `/server/key.js` file for this step to work.

* Verify that the `User` table was created and populated in the DB on phpMyAdmin

### Postman Setup

* Open Postman and import collection `postmanCollection.json`

* Create an environment with the following key values:
	
	```
	server	 				localhost:8888
	hipchatDomain			hipchat.tor.razorfish.com
	auth_token				XXXXXXXXX-PongHacksAPIkey
	personal_auth_token		XXXXXXXXX-PersonalAPIkey
	```
