#Anagram Hero

The goal is to implement a small word puzzle game that presents the user with a mangled word and asks her to enter the correct, unmangled word. If the word to unmangle is pizza the application may present the word as zpaiz and the user must then enter P I Z Z A in this order for the solution to be accepted.

## Install env

Required tools
NodeJS
ExpressJS
MongoDB

Install dependencies for the server by executing

```shell
npm install
```

## Starting Server Side

The Server will provide :
    List of possible words
        The list of words contains - The real word, the Anagram, the best score possible for this words

    List of last games and hightscore

    Authentication (whitout password) - using username
        To save hightscores and list them

### Run the server DB app

```shell
mongod
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

### Test API

curl localhost:3000/users
curl --data "name=value1" http://localhost:3000/users

curl localhost:3000/users/sudei

curl localhost:3000/words

## Starting Client Side

##Generate SASS Files via GulpJS

1. Installing GulpJS
```sh
npm install gulp --save-dev
npm install gulp-sass --save-dev
gulp sass
```
