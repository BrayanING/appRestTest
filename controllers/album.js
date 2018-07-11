var express = require('express');
var album = require('../models').Album;
var app = express();
var bcrypt = require('bcrypt');
const _ = require('underscore');

album.sync();

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
        .then((data) => {
            res.json(data);
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
            }
        })
        .then((data) => {
            res.json(data);
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
                .then((data) => {
                    res.json(data);
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
                .then((data) => {
                    res.json(data);
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
    update,
    updateStatus
}