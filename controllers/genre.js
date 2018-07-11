var express = require('express');
var genre = require('../models').Genre;
var app = express();
var bcrypt = require('bcrypt');
const _ = require('underscore');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

create = (req, res) => {
    let body = req.body;
    let genreSave = {};
    genreSave = {
        userId: body.userId,
        name: body.name,
        description: body.description
    };
    genre
        .create(genreSave)
        .then((genre) => {
            res.status(200).json({
                ok: true,
                genre
            });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err
            });
        });
};

listAll = (req, res) => {
    genre.findAll({
            where: {
                status: true
            }
        })
        .then((genres) => {
            res.status(200).json({
                ok: true,
                genres
            });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
        });
};

collectionGenre = (req, res) => {
    var name = req.params.name;
    genre.findAll({
            where: {
                status: true,
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        .then((genres) => {
            res.status(200).json({
                ok: true,
                genres
            });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
        });
};

update = (req, res) => {
    let body = req.body;
    let genreId = req.params.id;
    let updateGenre = {};
    updateGenre = _.pick(req.body, ['userId', 'name', 'description']);

    genre
        .findById(genreId)
        .then((genre) => {
            genre
                .update(updateGenre)
                .then((genre) => {
                    res.status(200).json({
                        ok: true,
                        genres: genre
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err
            });
        });
};

updateStatus = (req, res) => {
    let genreId = req.params.id;
    let updateGenre = {};
    updateGenre = {
        status: false
    };

    genre
        .findById(genreId)
        .then((genre) => {
            if (genre.status === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El dato no existe'
                    }
                });
            }

            genre
                .update(updateGenre)
                .then((genre) => {
                    res.status(200).json({
                        ok: true,
                        genre
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err
            });
        });
};


module.exports = {
    create,
    listAll,
    collectionGenre,
    update,
    updateStatus
}