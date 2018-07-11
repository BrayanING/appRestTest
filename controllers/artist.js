var express = require('express');
var artist = require('../models').Artist;
var app = express();
var bcrypt = require('bcrypt');
const _ = require('underscore');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
artist.sync();

create = (req, res) => {
    let body = req.body;
    let artistSave = {};

    artistSave = {
        userId: body.userId,
        name: body.name,
        bio: body.bio
    };

    artist
        .create(artistSave)
        .then((artist) => {
            res.status(200).json({
                ok: true,
                artist
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
    artist.findAll({
            where: {
                status: true
            }
        })
        .then((artists) => {
            res.status(200).json({
                ok: true,
                artists
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

collectionArtist = (req, res) => {
    var name = req.params.name;
    artist.findAll({
            where: {
                status: true,
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        .then((artists) => {
            res.status(200).json({
                ok: true,
                artists
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
    let artistId = req.params.id;
    let updateArtist = {};

    updateArtist = _.pick(req.body, ['userId', 'name', 'bio']);

    artist
        .findById(artistId)
        .then((artist) => {
            artist
                .update(updateArtist)
                .then((artist) => {
                    res.status(200).json({
                        ok: true,
                        artist
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
    let artistId = req.params.id;
    let updateArtist = {};
    updateArtist = {
        status: false
    };

    artist
        .findById(artistId)
        .then((artist) => {
            if (artist.status === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El dato no existe'
                    }
                });
            }

            artist
                .update(updateArtist)
                .then((artist) => {
                    res.status(200).json({
                        ok: true,
                        artist
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
    collectionArtist,
    update,
    updateStatus

}