# bytesdk-nodejs
byte system sdk in nodejs


##use application service

```javascript

    var AppSdk = require('byte-sdk');
    var keys = require('./keys...');
    
    var app = new AppSdk({
        id: 9, // application id
        keyPrivate: keys.private, 
        keyPublic: keys.key,
        passphrase: keys.passphrase,
        uri: 'http://app.test.byte.mn/v1'
    });
    console.log("jct=", app.genJCT());
    
    app.getJAT(function (err, jat) {
            console.log("jat=", jat);        
    });    
    
```
