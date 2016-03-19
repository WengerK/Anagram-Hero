#Anagram Hero

The goal is to implement a small word puzzle game that presents the user with a mangled word and asks her to enter the correct, unmangled word. If the word to unmangle is pizza the application may present the word as zpaiz and the user must then enter P I Z Z A in this order for the solution to be accepted.

Anagram Hero in action - Caution, the following gif is 10 frames per seconds, the real UX is little bit different.
![alt Anagram Hero in action](https://cloud.githubusercontent.com/assets/1841592/13899619/06625fec-edf3-11e5-8202-32c5f2c3049e.gif)

## Install env

Required tools
NodeJS
ExpressJS
MongoDB
Bower

## Starting Server Side

The Server will provide :

- List of possible words:

    The list of words contains - The real word, the Anagram, the best score possible for this words

- List of last games and highscore

- Authentication (whitout password) - using username

    To save highscores and list them

### Install dependencies for the server by executing
```shell
npm install
```

### Run the server DB app

```shell
mongod
```

You maybe will need to set the data path as following
```shell
mongod --dbpath /Applications/MAMP/db/mongodb/data/
```

### Seed the database
Run the app's seeder with the following command:

```shell
node seed.js
```

### Run the server app
Run the app with the following command:

```shell
node app.js
```

Then, load [http://localhost:3000](http://localhost:3000) in a browser to see the output.

### Run the server app with auto reloading
Install the Supervisor package as global

```shell
npm install supervisor -g
```

Run the app with the following command:

```shell
supervisor app.js  
```

### Test API - Curl

```shell
# get list all accounts
curl localhost:3000/users/list

# add account into db
curl -X POST --data "name=sudei" http://localhost:3000/users

# delete account into db
curl -X DELETE --data "name=sudei" http://localhost:3000/users

# get or add account into db
curl localhost:3000/users/sudei

# update highscore of given user
curl -X PUT --data "highscore=22" http://localhost:3000/users/highscore/sudei

# list words
curl localhost:3000/words

# get random word
curl localhost:3000/words/random
```

## Starting Client Side

### Install dependencies for the client by executing
```shell
bower install
```

### Generate SASS Files via GulpJS

1. Installing GulpJS
```shell
npm install gulp --save-dev
npm install gulp-sass --save-dev
gulp sass
```

## Continuous Integration Tests

### Installing mocha

```shell
npm install -g mocha
```

### Server tests using mocha

By default mocha will run everything in /test
```shell
mocha server/test
```
