var chai = require('chai');
var expect = chai.expect;
var assert = require('chai').assert;
var requests = require('../requests');

describe('Testing setup - mocha/chai', function() {
    describe('Just testing a dummy #indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

describe('Requests', function () {

    it("must encode the payload {} as a JSON", function () {
        var payload = {};
        var encoded = requests.encodeAsJSON(payload);
        expect(encoded).to.equal('{}');
    });

    it("must encode this { x: 1, y: 2 } as a JSON", function () {
        var payload = { x: 1, y: 2 };
        var encoded = requests.encodeAsJSON(payload);
        expect(encoded).to.equal('{"x":1,"y":2}');
    });

    it("must encode this typical sensor variables as a JSON", function () {
        var payload = { sensor: { x: 1, y: 2 }};
        var encoded = requests.encodeAsJSON(payload);
        expect(encoded).to.equal('{"sensor":{"x":1,"y":2}}');
    });


});

describe("POSTing data", function () {

    it("must send/post a simple JSON payload", function () {
        var payload = {};
        var jsonPayload = requests.encodeAsJSON(payload);
        console.log('jsonPayload: ' + jsonPayload);
        requests.postRequest();
        //expect(status).to.equal = 200;
    });
});
