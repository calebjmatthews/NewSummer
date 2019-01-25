'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
function default_1(app) {
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use('/client', (req, res) => {
        console.log(path_1.default.join(path_1.default.normalize(`${__dirname}/..`), ('client' + req.url)));
        res.sendFile(path_1.default.join(path_1.default.normalize(`${__dirname}/..`), ('client' + req.url)));
    });
    app.use(express_1.default.static(path_1.default.join(path_1.default.normalize(`${__dirname}/..`), 'dist')));
    // Routes go here
    app.all('/*', (req, res) => {
        console.log('Requested route not found:');
        console.log(req.url);
        res.sendFile(path_1.default.join(path_1.default.normalize(`${__dirname}/..`), 'client/index.html'));
    });
}
exports.default = default_1;
