var express = require('express');
var track = require('../models').Track;
var app = express();
var bcrypt = require('bcrypt');
const _ = require('underscore');

create = (req, res) => {
    let body = req.body;
    let trackSave = {};

    trackSave = {
        userId: body.userId,
        name: body.name,
        description: body.description,
        albumId: body.albumId
    };

    track
        .create(trackSave)
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
    track.findAll({
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
    let body = req.body;
    let trackId = req.params.id;
    let updateTrack = {};
    updateTrack = _.pick(req.body, ['userId', 'name', 'description', 'albumId']);

    track
        .findById(trackId)
        .then((track) => {
            track
                .update(updateTrack)
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

updateStatus = (req, res) => {
    let trackId = req.params.id;
    let updateTrack = {};
    updateTrack = {
        status: false
    };

    track
        .findById(trackId)
        .then((track) => {
            if (track.status === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El dato no existe'
                    }
                });
            }

            track
                .update(updateTrack)
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