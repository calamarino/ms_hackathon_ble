"use strict";
var http = require('http');
var postRequest = require('./post_request');
//var util = require('util');

var async = require('async');

var SensorTag = require('sensortag');
//var SensorTag = require('./index');

var USE_READ = true;

SensorTag.discover(function(sensorTag) {
    "use strict";

    console.log('discovered: ' + sensorTag);

    //sensorTag.on('disconnect', function() {
    //    console.log('disconnected!');
    //    process.exit(0);
    //});

    var payload = {};
    var accelerometer = {x:0, y:0, z:0};
    var magnetometer= {x:0, y:0, z:0};
    var gyroscope = {x:0, y:0, z:0};
    var objTemperature = 0;
    var ambTemperature = 0;
    var temper = 0;
    var humid = 0;
    var press = 0;

    readAndSend(sensorTag, payload, accelerometer, magnetometer, gyroscope,
        objTemperature, ambTemperature, temper, humid, press);

    //for (var i = 0; i < 4; i++) {
    //    readAndSend(sensorTag, payload, accelerometer, magnetometer, gyroscope,  objTemperature, ambTemperature);
    //}
});

// watch out: recursive
function readAndSend(sensorTag, payload, accelerometer, magnetometer, gyroscope,
                     objTemperature, ambTemperature, temper, humid, press) {

    sensorTag.on('disconnect', function() {
        console.log('disconnected!');
        process.exit(0);
    });

    async.series([
            function(callback) {
                console.log('connectAndSetUp');
                sensorTag.connectAndSetUp(callback);
            },
            // temperature
            function(callback) {
                //console.log('enableIrTemperature');
                sensorTag.enableIrTemperature(callback);
            },
            function(callback) {
                setTimeout(callback, 2000);
            },
            function(callback) {
                if (USE_READ) {
                    //console.log('readIrTemperature');
                    sensorTag.readIrTemperature(function(error, objectTemperature, ambientTemperature) {
                        //console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1));
                        //console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1));
                        objTemperature = objectTemperature.toFixed(1);
                        ambTemperature = ambientTemperature.toFixed(1);
                        callback();
                    });
                } else {
                    sensorTag.on('irTemperatureChange', function(objectTemperature, ambientTemperature) {
                        //console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1));
                        //console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1));
                        objTemperature = objectTemperature.toFixed(1);
                        ambTemperature = ambientTemperature.toFixed(1);
                    });

                    //console.log('setIrTemperaturePeriod');
                    sensorTag.setIrTemperaturePeriod(500, function(error) {
                        //console.log('notifyIrTemperature');
                        sensorTag.notifyIrTemperature(function(error) {
                            setTimeout(function() {
                                //console.log('unnotifyIrTemperature');
                                sensorTag.unnotifyIrTemperature(callback);
                            }, 5000);
                        });
                    });
                }
            },
            function(callback) {
                //console.log('disableIrTemperature');
                sensorTag.disableIrTemperature(callback);
            },

            function(callback) {
                //console.log('enableAccelerometer');
                sensorTag.enableAccelerometer(callback);
            },
            function(callback) {
                setTimeout(callback, 2000);
            },
            function(callback) {
                if (USE_READ) {
                    //console.log('readAccelerometer');
                    sensorTag.readAccelerometer(function(error, x, y, z) {
                        //console.log('\tx = %d G', x.toFixed(1));
                        //console.log('\ty = %d G', y.toFixed(1));
                        //console.log('\tz = %d G', z.toFixed(1));

                        accelerometer.x = x.toFixed(1);
                        accelerometer.y = y.toFixed(1);
                        accelerometer.z = z.toFixed(1);

                        callback();
                    });
                } else {
                    sensorTag.on('accelerometerChange', function(x, y, z) {
                        //console.log('\tx = %d G', x.toFixed(1));
                        //console.log('\ty = %d G', y.toFixed(1));
                        //console.log('\tz = %d G', z.toFixed(1));

                        accelerometer.x = x.toFixed(1);
                        accelerometer.y = y.toFixed(1);
                        accelerometer.z = z.toFixed(1);
                    });

                    //console.log('setAccelerometerPeriod');
                    sensorTag.setAccelerometerPeriod(500, function(error) {
                        //console.log('notifyAccelerometer');
                        sensorTag.notifyAccelerometer(function(error) {
                            setTimeout(function() {
                                //console.log('unnotifyAccelerometer');
                                sensorTag.unnotifyAccelerometer(callback);
                            }, 5000);
                        });
                    });
                }
            },
            function(callback) {
                //console.log('disableAccelerometer');
                sensorTag.disableAccelerometer(callback);
            },
            function(callback) {
                //console.log('enableMagnetometer');
                sensorTag.enableMagnetometer(callback);
            },
            function(callback) {
                setTimeout(callback, 2000);
            },
            function(callback) {
                if (USE_READ) {
                    //console.log('readMagnetometer');
                    sensorTag.readMagnetometer(function(error, x, y, z) {
                        //console.log('\tx = %d μT', x.toFixed(1));
                        //console.log('\ty = %d μT', y.toFixed(1));
                        //console.log('\tz = %d μT', z.toFixed(1));

                        magnetometer.x = x.toFixed(1);
                        magnetometer.y = y.toFixed(1);
                        magnetometer.z = z.toFixed(1);

                        callback();
                    });
                } else {
                    sensorTag.on('magnetometerChange', function(x, y, z) {
                        //console.log('\tx = %d μT', x.toFixed(1));
                        //console.log('\ty = %d μT', y.toFixed(1));
                        //console.log('\tz = %d μT', z.toFixed(1));

                        magnetometer.x = x.toFixed(1);
                        magnetometer.y = y.toFixed(1);
                        magnetometer.z = z.toFixed(1);
                    });

                    //console.log('setMagnetometerPeriod');
                    sensorTag.setMagnetometerPeriod(500, function(error) {
                        //console.log('notifyMagnetometer');
                        sensorTag.notifyMagnetometer(function(error) {
                            setTimeout(function() {
                                //console.log('unnotifyMagnetometer');
                                sensorTag.unnotifyMagnetometer(callback);
                            }, 5000);
                        });
                    });
                }

            },
            function(callback) {
                //console.log('disableMagnetometer');
                sensorTag.disableMagnetometer(callback);
            },

            // humidity
            function(callback) {
                //console.log('enableHumidity');
                sensorTag.enableHumidity(callback);
            },
            function(callback) {
                setTimeout(callback, 2000);
            },
            function(callback) {
                if (USE_READ) {
                    //console.log('readHumidity');
                    sensorTag.readHumidity(function(error, temperature, humidity) {
                        //console.log('\ttemperature = %d °C', temperature.toFixed(1));
                        //console.log('\thumidity = %d %', humidity.toFixed(1));
                        temper = temperature.toFixed(1);
                        humid = humidity.toFixed(1);
                        callback();
                    });
                } else {
                    sensorTag.on('humidityChange', function(temperature, humidity) {
                        //console.log('\ttemperature = %d °C', temperature.toFixed(1));
                        //console.log('\thumidity = %d %', humidity.toFixed(1));
                        temper = temperature.toFixed(1);
                        humid = humidity.toFixed(1);
                    });

                    //console.log('setHumidityPeriod');
                    sensorTag.setHumidityPeriod(500, function(error) {
                        //console.log('notifyHumidity');
                        sensorTag.notifyHumidity(function(error) {
                            setTimeout(function() {
                                //console.log('unnotifyHumidity');
                                sensorTag.unnotifyHumidity(callback);
                            }, 5000);
                        });
                    });
                }
            },
            function(callback) {
                //console.log('disableHumidity');
                sensorTag.disableHumidity(callback);
            },

            // barometer
            function(callback) {
                //console.log('enableBarometricPressure');
                sensorTag.enableBarometricPressure(callback);
            },
            function(callback) {
                setTimeout(callback, 2000);
            },
            function(callback) {
                if (USE_READ) {
                    //console.log('readBarometricPressure');
                    sensorTag.readBarometricPressure(function(error, pressure) {
                        //console.log('\tpressure = %d mBar', pressure.toFixed(1));
                        press = pressure.toFixed(1);
                        callback();
                    });
                } else {
                    sensorTag.on('barometricPressureChange', function(pressure) {
                        //console.log('\tpressure = %d mBar', pressure.toFixed(1));
                        press = pressure.toFixed(1);
                    });

                    //console.log('setBarometricPressurePeriod');
                    sensorTag.setBarometricPressurePeriod(500, function(error) {
                        //console.log('notifyBarometricPressure');
                        sensorTag.notifyBarometricPressure(function(error) {
                            setTimeout(function() {
                                //console.log('unnotifyBarometricPressure');
                                sensorTag.unnotifyBarometricPressure(callback);
                            }, 5000);
                        });
                    });
                }
            },
            function(callback) {
                //console.log('disableBarometricPressure');
                sensorTag.disableBarometricPressure(callback);
            },

            function(callback) {
                //console.log('enableGyroscope');
                sensorTag.enableGyroscope(callback);
            },
            function(callback) {
                setTimeout(callback, 2000);
            },
            function(callback) {
                if (USE_READ) {
                    //console.log('readGyroscope');
                    sensorTag.readGyroscope(function(error, x, y, z) {
                        //console.log('\tx = %d °/s', x.toFixed(1));
                        //console.log('\ty = %d °/s', y.toFixed(1));
                        //console.log('\tz = %d °/s', z.toFixed(1));

                        gyroscope.x = x.toFixed(1);
                        gyroscope.y = y.toFixed(1);
                        gyroscope.z = z.toFixed(1);

                        callback();
                    });
                } else {
                    sensorTag.on('gyroscopeChange', function(x, y, z) {
                        //console.log('\tx = %d °/s', x.toFixed(1));
                        //console.log('\ty = %d °/s', y.toFixed(1));
                        //console.log('\tz = %d °/s', z.toFixed(1));
                    });

                    gyroscope.x = x.toFixed(1);
                    gyroscope.y = y.toFixed(1);
                    gyroscope.z = z.toFixed(1);

                    //console.log('setGyroscopePeriod');
                    sensorTag.setGyroscopePeriod(500, function(error) {
                        //console.log('notifyGyroscope');
                        sensorTag.notifyGyroscope(function(error) {
                            setTimeout(function() {
                                //console.log('unnotifyGyroscope');
                                sensorTag.unnotifyGyroscope(callback);
                            }, 5000);
                        });
                    });
                }
            },
            function(callback) {

                //var payload = JSON.stringify({
                //    post_tests: 'tester'
                //});
                //var payload = {nothing: "happens?"};
                payload = {
                    magnetometer: magnetometer,
                    gyroscope: gyroscope,
                    accelerometer: accelerometer,
                    objectTemperature: objTemperature,
                    ambientTemperature: ambTemperature,
                    temperature: temper,
                    humidity: humid,
                    pressure: press
                };
                payload = JSON.stringify(payload);
                console.log("PAYLOAD: " + payload);
                var headers = {
                    'Content-Type': 'application/json',
                    'Content-Length': payload.length,
                    'Authorization': 'Basic' + new Buffer('demo' + ':' + 'demo').toString('base64')
                };

                //var options = {
                //    host: '10.10.150.222',
                //    path: '/servoy-service/rest_ws/msbd/free/ti_sensor/', // '/users/1',
                //    port: 9090,
                //    method: 'POST',
                //    headers: headers
                //};

                // http://demo:demo@ms.servoy.com:8080/mshackaton/servoy-service/rest_ws/msbd/free/{entity}
                var options = {
                    host: 'ms.servoy.com',
                    path: '/mshackaton/servoy-service/rest_ws/msbd/free/ti_sensor',
                    port: '8080',
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
                req.write(payload);
                req.end();
            }
            //, function(callback) {
            //    setTimeout(
            //        readAndSend(sensorTag, payload, accelerometer, magnetometer, gyroscope),
            //        10000
            //);
            //}
        ]
    );
}

var cb = function(response) {
    var str = '';

//another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
        console.log(str);
    });
};