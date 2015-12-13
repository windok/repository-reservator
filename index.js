#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var reserveRepo = require('./gitOperations');

var reserveDir = getAbsolute(argv.d) || getAbsolute(argv.dir) || process.cwd();
var remote = argv.r || argv.remote || 'reserve';

fs.readdirSync(reserveDir).forEach(function (file) {
    fs.stat(file, function (err, stat) {
        if (stat.isDirectory()) {
            reserveRepo(getAbsolute(file), remote);
        }
    });
});

function getAbsolute(pathPart) {
    if (!pathPart) {
        return pathPart;
    }

    if (path.isAbsolute(pathPart)) {
        return pathPart;
    }

    return process.cwd() + path.sep + pathPart;
}
