/*
The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes <bryan@nebri.us>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var raspi_peripheral_1 = require('raspi-peripheral');
// Creating type definition files for native code is...not so simple, so instead
// we just disable tslint and trust that it works. It's not any less safe than
// creating an external .d.ts file, and this way we don't have to move it around
// tslint:disable-next-line
var addon = require('../build/Release/addon');
var PWM = (function (_super) {
    __extends(PWM, _super);
    function PWM(config) {
        var pin = 'PWM0';
        var clockDivisor = 400;
        var range = 1000;
        if (typeof config === 'number' || typeof config === 'string') {
            pin = config;
        }
        else if (typeof config === 'object') {
            if (typeof config.pin === 'number' || typeof config.pin === 'string') {
                pin = config.pin;
            }
            if (typeof config.clockDivisor === 'number') {
                clockDivisor = config.clockDivisor;
            }
            if (typeof config.range === 'number') {
                range = config.range;
            }
        }
        _super.call(this, pin);
        this.rangeValue = range;
        this.clockDivisorValue = clockDivisor;
        addon.init(this.pins[0], clockDivisor, range);
    }
    Object.defineProperty(PWM.prototype, "clockDivisor", {
        get: function () {
            return this.clockDivisorValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PWM.prototype, "range", {
        get: function () {
            return this.rangeValue;
        },
        enumerable: true,
        configurable: true
    });
    PWM.prototype.write = function (value) {
        if (!this.alive) {
            throw new Error('Attempted to write to a destroyed peripheral');
        }
        if (typeof value !== 'number' || value < 0 || value > 1024) {
            throw new Error('Invalid PWM value ' + value);
        }
        addon.write(this.pins[0], value);
    };
    return PWM;
}(raspi_peripheral_1.Peripheral));
exports.PWM = PWM;
//# sourceMappingURL=index.js.map