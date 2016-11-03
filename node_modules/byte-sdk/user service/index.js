var jwt = require('jsonwebtoken');
var request = require('request');


/**
 *
 * @param options.app
 * @param options.keyPrivate
 * @param options.keyPublic
 * @param options.passphrase
 * @constructor
 */
function UserSdk(options) {
    "use strict";
    var self = this;

    var app = options.client || options.app;
    if (!app) {
        throw new Error("`options.client || options.app` is required");
    }

    var uri = options.uri || 'http://userly.byte.mn/last';

    self.loginFb = function (accesstoken, callback) {

        app.getJAT(function (err, respJat) {
            if (err) {
                return callback(err);
            }
            if (respJat.payload && respJat.payload.name === "jat" && respJat.jat) {
                if (!(respJat.payload.userly && respJat.payload.userly.enable)) {
                    return callback("not enabled userly service");
                }
                var jatCode = respJat.jat;
                request({
                    url: uri + "/login/fb",
                    method: 'POST',
                    headers: {
                        authorization: 'Bearer ' + jatCode
                    },
                    json: {accesstoken: accesstoken}
                }, function (err, httpResponse, body) {
                    if (err) {
                        return callback(err);
                    }
                    callback(false, body);
                });

            } else {
                return callback("jat format error");
            }
        });
    };
}

module.exports = UserSdk;
module.exports.UserSdk = UserSdk;

