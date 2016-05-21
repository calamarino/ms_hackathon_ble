# MS-Hackathon

## Idea

Send (json) data to the cloud using the TI Sensortag CC2650 for post-processing.

## Software

### node-sensortag
Node.js lib for the TI SensorTag and TI CC2650 SensorTag

https://github.com/sandeepmistry/node-sensortag

#### Prerequisites used by this module

1. node-gyp: node-gyp is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js. 
It bundles the gyp project used by the Chromium team and takes away the pain of dealing with the various differences in build platforms. https://github.com/nodejs/node-gyp
** Project: gyp
Generate Your Projects
GYP is a Meta-Build system: a build system that generates other build systems.
https://gyp.gsrc.io/
2. noble: A Node.js BLE (Bluetooth Low Energy) central module. https://github.com/sandeepmistry/noble

##### OS and Packages used on THIS implementation 

- raspberry-pi Raspbian GNU/Linux 8.0 (jessie) 

- Package: bluetooth; Versions: 5.36-1
- Package: bluez; Versions: 5.36-1+b1 
- Package: libbluetooth-dev; Versions: 5.36-1+b1 
- Package: libudev-dev; Versions: 229-5 

Node dependencies: check `package.json`



