var AppSdk = require('../index');
var keys = require('./keys/keys');

var app = new AppSdk({
    id: 9,
    keyPrivate: keys.private,
    keyPublic: keys.key,
    passphrase: keys.passphrase,
    uri: 'http://app.test.byte.mn/v1'
});

function appService(done){
    console.log('app service ---------------------------------------');
    console.log("jct=", app.genJCT());
    app.getJAT(function (err, jat) {
        console.log("jat=", jat);
        done();
    });
}

function userService(done){
    console.log('user service ---------------------------------------');

    var UserSdk = require('../user service');

    var user = new UserSdk({
        app : app,
        uri: 'http://userly.test.byte.mn/v1'
    });


    var at = "EAAPQtAy046cBADXsemtjKbv9XWJ0XURYJM5DbmI4IUpzs3nJRiwWpsNtaf9zvZBg93X1ClBkb3FRqYnzVMs0VIE1D0ZAT4nrzboUlIbQAtudoPmHBmTDNkia02TxDbpKPU6P84bHps2F7mZCOlIlYTSOt6rAt8ZD";

    user.loginFb(at,function (err, userinfo) {
        console.log("loginFb",err);
        console.log("loginFb",userinfo);
        done();
    });
}

appService(function () {
    console.log('--- done userService')
    userService(function () {
        
    });
})

