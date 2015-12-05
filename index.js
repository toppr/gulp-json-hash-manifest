'use strict';

var _ = require('lodash');
var gutil = require('gulp-util');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var slash = require('slash');
var crypto = require('crypto');
var jsonFile = require('jsonfile')
var through = require('through');

function hashmanifest(options) {
    options = _.defaults(options || {}, {
        dest: process.cwd(),
        hash: 'sha1',
        filename: 'hash-manifest.json'
    });

    var hashesFilePath = path.resolve(options.dest, options.filename);
    var hashes = {};
    var self = this;
    var pluginName = 'gulp-json-hash-manifest';

    function computeHash(file) {
        if (file.isNull()) {
            return;
        }

        if (file.isStream()) {
            self.emit('error', new gutil.PluginError(pluginName, 'Streams not supported'));
            return;
        }

        var filePath = path.resolve(options.dest, file.path);
        var relativeFilePath = slash(path.relative(path.dirname(hashesFilePath), filePath));
        hashes[relativeFilePath] = crypto
            .createHash(options.hash)
            .update(file.contents, 'binary')
            .digest('hex');

        self.push(file);
    }

    function writeHashes() {
        if (!fs.existsSync(hashesFilePath)) {
            mkdirp(path.dirname(hashesFilePath));
        }

        jsonFile.writeFile(hashesFilePath, hashes, function (err) {
            if (err) {
                self.emit('error', new gutil.PluginError(pluginName, err));
            }
        });

        self.emit('end');
    }

    return through(computeHash, writeHashes);
}

module.exports = hashmanifest;