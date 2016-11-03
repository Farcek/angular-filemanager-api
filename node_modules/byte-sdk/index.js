var jwt = require('jsonwebtoken');
var request = require('request');

var pkginfo = require('./package.json');


/**
 *
 * @param options.app
 * @param options.keyPrivate
 * @param options.keyPublic
 * @param options.passphrase
 * @param options.uri
 * @constructor
 */
function AppSdk(options) {
    "use strict";
    var self = this;

    var app = options.id || options.app || options.appId;
    if (!app) {
        throw new Error("`options.id || options.app || options.appId` is required");
    }

    var keyPrivate = options.keyPrivate;
    var keyPublic = options.keyPublic;
    var passphrase = options.passphrase || '';

    var uri = options.uri || 'http://app.byte.mn/last';

    self.genJCT = function () {
        return jwt.sign({ name: 'jct', app: app }, {
            key: keyPrivate, passphrase: passphrase
        }, { algorithm: 'RS256' });
    };

    self.getJAT = function (callback) {
        request({
            url: uri + "/" + app,
            method: 'POST',
            json: { jct: self.genJCT() }
        }, function (err, httpResponse, body) {
            console.log('byteSDK getJAT - httpResponse.statusCode >>', httpResponse.statusCode)
            if (err) {
                return callback(err);
            }
            if (httpResponse.statusCode == 200) {
                return callback(false, body);
            }

            callback({
                err: true,
                resp: httpResponse,
                body: body
            });
        });
    };
}

module.exports = AppSdk;
module.exports.AppSdk = AppSdk;
module.exports.version = pkginfo.version;

