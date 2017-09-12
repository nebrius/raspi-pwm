"use strict";
/*
The MIT License (MIT)

Copyright (c) 2014-2017 Bryan Hughes <bryan@nebri.us>

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var raspi_peripheral_1 = require("raspi-peripheral");
var pigpio_1 = require("pigpio");
var DEFAULT_PIN = 1;
var DEFAULT_FREQUENCY = 50;
var MAX_DUTY_CYCLE = 1000000;
var PWM0 = 'PWM0';
var PWM1 = 'PWM1';
// So there's a funky thing with PWM, where there are four PWM-capable pins,
// but only two actual PWM ports. So the standard pin contention mechanism
// doesn't _quite_ cover all cases. This object tracks which PWM peripherals are
// in use at a given time, so we can do error checking on it.
var pwmPeripheralsInUse = (_a = {},
    _a[PWM0] = false,
    _a[PWM1] = false,
    _a);
var PWM = /** @class */ (function (_super) {
    __extends(PWM, _super);
    function PWM(config) {
        var _this = this;
        var pin = DEFAULT_PIN;
        var frequency = DEFAULT_FREQUENCY;
        if (typeof config === 'number' || typeof config === 'string') {
            pin = config;
        }
        else if (typeof config === 'object') {
            if (typeof config.pin === 'number' || typeof config.pin === 'string') {
                pin = config.pin;
            }
            if (typeof config.frequency === 'number') {
                frequency = config.frequency;
            }
        }
        _this = _super.call(this, pin) || this;
        // Pin details from http://elinux.org/RPi_BCM2835_GPIOs
        var gpioPin;
        var mode;
        switch (_this.pins[0]) {
            case 26:// GPIO12 PWM0 ALT0
                gpioPin = 12;
                mode = pigpio_1.Gpio.ALT0;
                _this._pwmPort = PWM0;
                break;
            case 1:// GPIO18 PWM0 ALT5
                gpioPin = 18;
                mode = pigpio_1.Gpio.ALT5;
                _this._pwmPort = PWM0;
                break;
            case 23:// GPIO13 PWM1 ALT0
                gpioPin = 13;
                mode = pigpio_1.Gpio.ALT0;
                _this._pwmPort = PWM1;
                break;
            case 24:// GPIO19 PWM1 ALT5
                gpioPin = 19;
                mode = pigpio_1.Gpio.ALT5;
                _this._pwmPort = PWM1;
                break;
            default:
                throw new Error("Pin " + pin + " does not support hardware PWM");
        }
        if (pwmPeripheralsInUse[_this._pwmPort]) {
            throw new Error(_this._pwmPort + " is already in use and cannot be used again");
        }
        pwmPeripheralsInUse[_this._pwmPort] = true;
        _this._frequencyValue = frequency;
        _this._dutyCycleValue = 0;
        _this._pwm = new pigpio_1.Gpio(gpioPin, { mode: mode });
        return _this;
    }
    Object.defineProperty(PWM.prototype, "frequency", {
        get: function () {
            return this._frequencyValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PWM.prototype, "dutyCycle", {
        get: function () {
            return this._dutyCycleValue;
        },
        enumerable: true,
        configurable: true
    });
    PWM.prototype.destroy = function () {
        pwmPeripheralsInUse[this._pwmPort] = false;
        _super.prototype.destroy.call(this);
    };
    PWM.prototype.write = function (dutyCycle) {
        if (!this.alive) {
            throw new Error('Attempted to write to a destroyed peripheral');
        }
        if (typeof dutyCycle !== 'number' || dutyCycle < 0 || dutyCycle > 1) {
            throw new Error("Invalid PWM duty cycle " + dutyCycle);
        }
        this._dutyCycleValue = dutyCycle;
        this._pwm.hardwarePwmWrite(this._frequencyValue, Math.round(this._dutyCycleValue * MAX_DUTY_CYCLE));
        this.emit('change', this._dutyCycleValue);
    };
    return PWM;
}(raspi_peripheral_1.Peripheral));
exports.PWM = PWM;
var _a;
//# sourceMappingURL=index.js.map