/*
The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes <bryan@theoreticalideations.com>

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

import { Peripheral } from 'raspi-peripheral';
import addon from '../build/Release/addon';

export class PWM extends Peripheral {
  constructor(config) {
    let pin = 'PWM0';
    let clockDivisor = 400;
    let range = 1000;
    if (typeof config == 'number' || typeof config == 'string') {
      pin = config;
    } else if (typeof config == 'object') {
      if (typeof config.pin == 'number' || typeof config.pin == 'string') {
        pin = config.pin;
      }
      if (typeof config.clockDivisor == 'number') {
        clockDivisor = config.clockDivisor;
      }
      if (typeof config.range == 'number') {
        range = config.range;
      }
    }
    super(pin);
    addon.init(this.pins[0], clockDivisor, range);
  }

  write(value) {
    if (!this.alive) {
      throw new Error('Attempted to write to a destroyed peripheral');
    }
    if (typeof value != 'number' || value < 0 || value > 1024) {
      throw new Error('Invalid PWM value ' + value);
    }
    addon.write(this.pins[0], value);
  }
}
