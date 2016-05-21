"use strict";

//var util = require('util');

var async = require('async');

var SensorTag = require('sensortag');
//var SensorTag = require('./index');

var USE_READ = true;

SensorTag.discover(function(sensorTag) {
    console.log('discovered: ' + sensorTag);

    sensorTag.on('disconnect', function() {
        console.log('disconnected!');
        process.exit(0);
    });

    async.series([
            function(callback) {
                console.log('connectAndSetUp');
                sensorTag.connectAndSetUp(callback);
            },
            function(callback) {
                console.log('enableAccelerometer');
                sensorTag.enableAccelerometer(callback);
            },
            function(callback) {
                setTimeout(callback, 2000);
            },
            function(callback) {
                if (USE_READ) {
                    console.log('readAccelerometer');
                    sensorTag.readAccelerometer(function(error, x, y, z) {
                        console.log('\tx = %d G', x.toFixed(1));
                        console.log('\ty = %d G', y.toFixed(1));
                        console.log('\tz = %d G', z.toFixed(1));

                        callback();
                    });
                } else {
                    sensorTag.on('accelerometerChange', function(x, y, z) {
                        console.log('\tx = %d G', x.toFixed(1));
                        console.log('\ty = %d G', y.toFixed(1));
                        console.log('\tz = %d G', z.toFixed(1));
                    });

                    console.log('setAccelerometerPeriod');
                    sensorTag.setAccelerometerPeriod(500, function(error) {
                        console.log('notifyAccelerometer');
                        sensorTag.notifyAccelerometer(function(error) {
                            setTimeout(function() {
                                console.log('unnotifyAccelerometer');
                                sensorTag.unnotifyAccelerometer(callback);
                            }, 5000);
                        });
                    });
                }
            },
            function(callback) {
                console.log('disableAccelerometer');
                sensorTag.disableAccelerometer(callback);
            },
            function(callback) {
                console.log('enableMagnetometer');
                sensorTag.enableMagnetometer(callback);
            },
            function(callback) {
                setTimeout(callback, 2000);
            },
            function(callback) {
                if (USE_READ) {
                    console.log('readMagnetometer');
                    sensorTag.readMagnetometer(function(error, x, y, z) {
                        console.log('\tx = %d μT', x.toFixed(1));
                        console.log('\ty = %d μT', y.toFixed(1));
                        console.log('\tz = %d μT', z.toFixed(1));

                        callback();
                    });
                } else {
                    sensorTag.on('magnetometerChange', function(x, y, z) {
                        console.log('\tx = %d μT', x.toFixed(1));
                        console.log('\ty = %d μT', y.toFixed(1));
                        console.log('\tz = %d μT', z.toFixed(1));
                    });

                    console.log('setMagnetometerPeriod');
                    sensorTag.setMagnetometerPeriod(500, function(error) {
                        console.log('notifyMagnetometer');
                        sensorTag.notifyMagnetometer(function(error) {
                            setTimeout(function() {
                                console.log('unnotifyMagnetometer');
                                sensorTag.unnotifyMagnetometer(callback);
                            }, 5000);
                        });
                    });
                }
            },
            function(callback) {
                console.log('disableMagnetometer');
                sensorTag.disableMagnetometer(callback);
            },
            function(callback) {
                console.log('enableGyroscope');
                sensorTag.enableGyroscope(callback);
            },
            function(callback) {
                setTimeout(callback, 2000);
            },
            function(callback) {
                if (USE_READ) {
                    console.log('readGyroscope');
                    sensorTag.readGyroscope(function(error, x, y, z) {
                        console.log('\tx = %d °/s', x.toFixed(1));
                        console.log('\ty = %d °/s', y.toFixed(1));
                        console.log('\tz = %d °/s', z.toFixed(1));

                        callback();
                    });
                } else {
                    sensorTag.on('gyroscopeChange', function(x, y, z) {
                        console.log('\tx = %d °/s', x.toFixed(1));
                        console.log('\ty = %d °/s', y.toFixed(1));
                        console.log('\tz = %d °/s', z.toFixed(1));
                    });

                    console.log('setGyroscopePeriod');
                    sensorTag.setGyroscopePeriod(500, function(error) {
                        console.log('notifyGyroscope');
                        sensorTag.notifyGyroscope(function(error) {
                            setTimeout(function() {
                                console.log('unnotifyGyroscope');
                                sensorTag.unnotifyGyroscope(callback);
                            }, 5000);
                        });
                    });
                }
            },
            function(callback) {
                console.log('disconnect');
                sensorTag.disconnect(callback);
            }
        ]
    );
});
;