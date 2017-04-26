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

import { Peripheral } from 'raspi-peripheral';
import { Gpio } from 'pigpio';

export interface IConfig {
  pin?: number | string;
  frequency?: number;
}

const DEFAULT_PIN = 1;
const DEFAULT_FREQUENCY = 50;
const MAX_DUTY_CYCLE = 1000000;

const PWM0 = 'PWM0';
const PWM1 = 'PWM1';

// So there's a funky thing with PWM, where there are four PWM-capable pins,
// but only two actual PWM ports. So the standard pin contention mechanism
// doesn't _quite_ cover all cases. This object tracks which PWM peripherals are
// in use at a given time, so we can do error checking on it.
const pwmPeripheralsInUse = {
  [PWM0]: false,
  [PWM1]: false
};

export class PWM extends Peripheral {

  private frequencyValue: number;
  private dutyCycleValue: number;
  private pwmPort: string;

  private pwm: Gpio;

  public get frequency() {
    return this.frequencyValue;
  }

  public get dutyCycle() {
    return this.dutyCycleValue;
  }

  constructor(config?: number | string | IConfig) {
    let pin: number | string = DEFAULT_PIN;
    let frequency = DEFAULT_FREQUENCY;
    if (typeof config === 'number' || typeof config === 'string') {
      pin = config;
    } else if (typeof config === 'object') {
      if (typeof config.pin === 'number' || typeof config.pin === 'string') {
        pin = config.pin;
      }
      if (typeof config.frequency === 'number') {
        frequency = config.frequency;
      }
    }
    super(pin);

    // Pin details from http://elinux.org/RPi_BCM2835_GPIOs
    let gpioPin: number;
    let mode: number;
    switch (this.pins[0]) {
      case 26: // GPIO12 PWM0 ALT0
        gpioPin = 12;
        mode = Gpio.ALT0;
        this.pwmPort = PWM0;
        break;
      case 1: // GPIO18 PWM0 ALT5
        gpioPin = 18;
        mode = Gpio.ALT5;
        this.pwmPort = PWM0;
        break;
      case 23: // GPIO13 PWM1 ALT0
        gpioPin = 13;
        mode = Gpio.ALT0;
        this.pwmPort = PWM1;
        break;
      case 24: // GPIO19 PWM1 ALT5
        gpioPin = 19;
        mode = Gpio.ALT5;
        this.pwmPort = PWM1;
        break;
      default:
        throw new Error(`Pin ${pin} does not support hardware PWM`);
    }

    if (pwmPeripheralsInUse[this.pwmPort]) {
      throw new Error(`${this.pwmPort} is already in use and cannot be used again`);
    }
    pwmPeripheralsInUse[this.pwmPort] = true;

    this.frequencyValue = frequency;
    this.dutyCycleValue = 0;
    this.pwm = new Gpio(gpioPin, { mode });
  }

  public destroy() {
    pwmPeripheralsInUse[this.pwmPort] = false;
    super.destroy();
  }

  public write(dutyCycle: number) {
    if (!this.alive) {
      throw new Error('Attempted to write to a destroyed peripheral');
    }
    if (typeof dutyCycle !== 'number' || dutyCycle < 0 || dutyCycle > 1) {
      throw new Error(`Invalid PWM duty cycle ${dutyCycle}`);
    }
    this.dutyCycleValue = dutyCycle;
    this.pwm.hardwarePwmWrite(this.frequencyValue, Math.round(this.dutyCycleValue * MAX_DUTY_CYCLE));
  }
}
