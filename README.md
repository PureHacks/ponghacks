# Pong hacks :fire:

## Stack

* MySQL

* Express

* Angular

* Node

## Getting started

* install dependencies
	```
	sudo npm install
	```

* start node server
	```
	node server.js
	```

* open browser
	```
	localhost:8888
	```

### Local MySQL development

* Start a MAMP server with MySQL on port 8889

* Open phpMyAdmin
	```
	http://localhost/MAMP/index.php?page=phpmyadmin&language=English
	```

* In the SQL tab paste the contents of `createDatabase.sql` and hit "Go"

* Reload the navigation panel and verify PongHacks has been created

* Parse the users from Razorfish hipchat server

	```
	node services/updateUsers.js
	```

* Create `key.js` in root directory with the following contents:

	```
	module.exports = {auth_token: "XXXXXXX-PersonalAPIkey"};
	```

	Your personal token can be retrieved from `https://hipchat.tor.razorfish.com/account/api`


### Postman Setup

* Open Postman and import collection `postmanCollection.json`

* Create an environment with the following key values:
	
	```
	server	 				localhost:8888
	hipchatDomain			hipchat.tor.razorfish.com
	auth_token				XXXXXXXXX-PongHacksAPIkey
	personal_auth_token		XXXXXXXXX-PersonalAPIkey
	```
