var express = require('express');
var album = require('../models').Album;
var artist = require('../models').Artist;
var genre = require('../models').Genre;
var app = express();
var bcrypt = require('bcrypt');
const _ = require('underscore');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

create = (req, res) => {
    let body = req.body;
    let albumSave = {};

    albumSave = {
        userId: body.userId,
        name: body.name,
        artistId: body.artistId,
        dateReleased: body.dateReleased,
        genreId: body.genreId
    };

    album
        .create(albumSave)
        .then((album) => {
            res.status(200).json({
                ok: true,
                album
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
    album.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: artist,
                    required: true,
                    attributes: ['id', 'name']
                },
                {
                    model: genre,
                    required: true,
                    attributes: ['id', 'name']
                }
            ]
        })
        .then((albums) => {
            res.status(200).json({
                ok: true,
                albums
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

collectionAlbum = (req, res) => {
    var name = req.params.name;
    album.findAll({
            where: {
                status: true,
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            include: [{
                    model: artist,
                    required: true,
                    attributes: ['id', 'name']
                },
                {
                    model: genre,
                    required: true,
                    attributes: ['id', 'name']
                }
            ]
        })
        .then((albums) => {
            res.status(200).json({
                ok: true,
                albums
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
    let albumId = req.params.id;
    let updateAlbum = {};

    updateAlbum = _.pick(req.body, ['userId', 'name', 'artistId', 'dateReleased', 'genreId']);

    album
        .findById(albumId)
        .then((album) => {
            album
                .update(updateAlbum)
                .then((album) => {
                    res.status(200).json({
                        ok: true,
                        album
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
            })
        });
};

updateStatus = (req, res) => {
    let albumId = req.params.id;
    let updateAlbum = {};
    updateAlbum = {
        status: false
    };

    album
        .findById(albumId)
        .then((album) => {
            if (album.status === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El dato no existe'
                    }
                });
            }

            album
                .update(updateAlbum)
                .then((album) => {
                    res.status(200).json({
                        ok: true,
                        album
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
    collectionAlbum,
    update,
    updateStatus
}