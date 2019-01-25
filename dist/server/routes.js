'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
function default_1(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(path.normalize(`${__dirname}/..`), 'build')));
    // Routes go here
    app.all('/*', (req, res) => {
        res.sendFile(path.join(path.normalize(`${__dirname}/..`), 'client/index.html'));
    });
}
exports.default = default_1;
