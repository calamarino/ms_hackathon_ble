var http = require('http');

var payload = JSON.stringify({
    post_tests: 'tester'
});

var headers = {
    'Content-Type': 'application/json',
    'Content-Length': payload.length,
    'Authorization': 'Basic' + new Buffer('demo' + ':' + 'demo').toString('base64')
};

var options = {
    host: '10.10.150.222',
    path: '/servoy-service/rest_ws/msbd/free/ti_sensor/post_tests', // '/users/1',
    port: 9090,
    method: 'POST',
    headers: headers
};

var req = http.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
        console.log('Body: ' + body);
    });
});
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
// write data to request body
//req.write('{"hey": "Antonio here"}');
req.write(payload);
//http.request(options, cb).write(payload);
req.end();