var express = require('express');
var user = require('../models').User;
var app = express();
var bcrypt = require('bcrypt');
const _ = require('underscore');
var jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


create = (req, res) => {
    let body = req.body;
    let userSave = {};
    userSave = user.build({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });
    userSave
        .save()
        .then((user) => {
            res.status(200).json({
                ok: true,
                user
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
    user.findAll({
            attributes: ['id', 'name', 'email', 'img', 'status'],
            where: {
                status: true
            }
        })
        .then((users) => {
            res.status(200).json({
                ok: true,
                users,
                usuarioToken: req.userToken
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

collectionUser = (req, res) => {
    var name = req.params.name;
    user.findAll({
            where: {
                status: true,
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        .then((users) => {
            res.status(200).json({
                ok: true,
                users
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

login = (req, res) => {
    var body = req.body;
    var userSearch = {};
    userSearch = {
        email: body.email,
        password: body.password
    }
    user.findOne({
            where: {
                status: true,
                email: userSearch.email
            }
        })
        .then((user) => {
            if (!bcrypt.compareSync(userSearch.password, user.password)) {
                return res.status(400).json({
                    ok: false,
                    message: 'Credenciales incorrectas'
                });
            }

            var token = jwt.sign({
                user: user
            }, process.env.SEED, {
                expiresIn: process.env.CADUCIDAD_TOKEN
            });
            user.password = '';
            res.status(200).json({
                ok: true,
                message: 'Login correcto',
                users: user,
                id: user.id,
                token
            });

        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'Credenciales incorrectas'
                }
            });
        });
};

update = (req, res) => {
    let body = req.body;
    let userId = req.params.id;
    let updateUser = {};
    updateUser = _.pick(req.body, ['name', 'email']);

    user
        .findById(userId)
        .then((user) => {
            user
                .update(updateUser)
                .then((user) => {
                    res.status(200).json({
                        ok: true,
                        user
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
    let userId = req.params.id;
    let updateUser = {};
    updateUser = {
        status: false
    };

    user
        .findById(userId)
        .then((user) => {
            if (user.status === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El dato no existe'
                    }
                });
            }

            user
                .update(updateUser)
                .then((user) => {
                    res.status(200).json({
                        ok: true,
                        user
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
    collectionUser,
    login,
    update,
    updateStatus

}