var userController = require('../controllers').user;
var genreController = require('../controllers').genre;
var artistController = require('../controllers').artist;
var albumController = require('../controllers').album;
var trackController = require('../controllers').track;
var verificaToken = require('../middlewares/autenticacion').verificaToken;
var express = require('express');
var app = express();

app.get('/user', userController.listAll);
app.get('/user/collection/:name', userController.collectionUser);
app.post('/user', userController.create);
app.post('/login', userController.login);
app.put('/user/:id', userController.update);
app.delete('/user/:id', userController.updateStatus);

app.get('/genre', genreController.listAll);
app.get('/genre/collection/:name', genreController.collectionGenre);
app.post('/genre', genreController.create);
app.put('/genre/:id', genreController.update);
app.delete('/genre/:id', genreController.updateStatus);

app.get('/artist', artistController.listAll);
app.get('/artist/collection/:name', artistController.collectionArtist);
app.post('/artist', artistController.create);
app.put('/artist/:id', artistController.update);
app.delete('/artist/:id', artistController.updateStatus);

app.get('/album', albumController.listAll);
app.get('/album/collection/:name', albumController.collectionAlbum);
app.post('/album', albumController.create);
app.put('/album/:id', albumController.update);
app.delete('/album/:id', albumController.updateStatus);

app.get('/track', trackController.listAll);
app.post('/track', trackController.create);
app.put('/track/:id', trackController.update);
app.delete('/track/:id', trackController.updateStatus);


module.exports = app;