Raspi PWM
==========

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nebrius/raspi-io?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Raspi PWM is part of the [Raspi.js suite](https://github.com/nebrius/raspi) that provides access to the hardware PWM.

If you have a bug report, feature request, or wish to contribute code, please be sure to check out the [Raspi IO Contributing Guide](https://github.com/nebrius/raspi-io/blob/master/CONTRIBUTING.md).

## System Requirements

- Raspberry Pi Model B Rev 1 or newer (sorry Model A users)
- Raspbian Jessie or newer
  - [Node-RED](http://nodered.org/) works, but can be finicky and difficult to debug.
  - See https://github.com/nebrius/raspi-io/issues/24 for more info about support for other OSes
- Node 6.4.0 or newer

Detailed instructions for getting a Raspberry Pi ready for NodeBots, including how to install Node.js, can be found in the [wiki](https://github.com/nebrius/raspi-io/wiki/Getting-a-Raspberry-Pi-ready-for-NodeBots)

## Installation

First, be sure that you have installed [raspi](https://github.com/nebrius/raspi).

Install with npm:

```sh
npm install raspi-pwm
```

**Note:** this project is written in [TypeScript](http://www.typescriptlang.org/) and includes type definitions in the package.json file. This means that if you want to use it from TypeScript, you don't need to install a separate @types module.

## Example Usage

In TypeScript/ES6:

```TypeScript
import { init } from 'raspi';
import { PWM } from 'raspi-pwm';

init(() => {
  const led = new PWM('P1-12');
  led.write(0.5); // 50% Duty Cycle, half brightness
});
```

In JavaScript:

```JavaScript
const raspi = require('raspi');
const pwm = require('raspi-pwm');

raspi.init(() => {
  const led = new pwm.PWM('P1-12');
  led.write(0.5); // 50% Duty Cycle, aka half brightness
});
```

## Pin Naming

The pins on the Raspberry Pi are a little complicated. There are multiple headers on some Raspberry Pis with extra pins, and the pin numbers are not consistent between Raspberry Pi board versions.

To help make it easier, you can specify pins in three ways. The first is to specify the pin by function, e.g. `'GPIO18'`. The second way is to specify by pin number, which is specified in the form "P[header]-[pin]", e.g. `'P1-7'`. The final way is specify the [Wiring Pi virtual pin number](http://wiringpi.com/pins/), e.g. `7`. If you specify a number instead of a string, it is assumed to be a Wiring Pi number.

Be sure to read the [full list of pins](https://github.com/nebrius/raspi-io/wiki/Pin-Information) on the supported models of the Raspberry Pi.

## PWM ports

Raspberry Pi Model B Rev 2 and older versions of the Raspberry Pi only expose one PWM port on pin `P1-12`, so be sure to always use that port (or leave it as the default). The Raspberry Pi Model B+ and newer exposes two PWM ports.

On newer Raspberry Pi's, these two PWM ports can be accessed via four different pins. `PWM0` can be accessed on either pin `P1-12` _or_ `P1-32`, and `PWM1` can be accessed on either pin `P1-33` _or_ `P1-35`. Each PWM _cannot_ be accessed on both pins though.

If you try to run the following code, which initializes both PWM0 ports,  _you will get an exception_.

```JavaScript
const raspi = require('raspi');
const pwm = require('raspi-pwm');

raspi.init(() => {
  const led1 = new pwm.PWM('P1-12');
  const led2 = new pwm.PWM('P1-32');
});
```

## API

### new PWM(config)

Instantiates a new PWM instance on the given pin. Note that PWM is limited to only 1 pin on the Model A/B and 2 pins on the A+/B+/2/Zero. On the A/B, the PWM pin is exposed on `GPIO18`. The A+/B+/2 is a little more complicated. The first PWM is exposed on two pins, `GPIO18` and `GPIO12`. This PWM can only be active on one of these pins at a time, however, so choose carefully. The second PWM pin on the A+/B+/2/Zero is exposed on `GPIO19`. Check the [wiring information wiki](https://github.com/nebrius/raspi-io/wiki) for more information.

_Arguments_:

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>config (optional)</td>
    <td>Number | String | Object</td>
    <td>The configuration for the PWM pin. If the config is a number or string, it is assumed to be the pin number for the peripheral. If it is an object, the following properties are supported:</td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tr>
          <td>pin (optional)</td>
          <td>Number | String</td>
          <td>The pin number or descriptor for the peripheral. Defaults to 1 (GPIO18, PWM0).</td>
        </tr>
        <tr>
          <td>frequency (optional)</td>
          <td>Number</td>
          <td>The frequency, in Hz, of the PWM signal. Defaults to 50.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

### Instance Properties

#### frequency

A number representing the frequency initialization value, in Hz. If a value for `frequency` was passed to the constructor, it is reflected back here. If no value for `frequency` was passed to the constructor, then this reflects the default frequency value of `50`.

#### dutyCycle

A number representing the last written dutyCycle. If this property is read before a value is written, `0` is returned.

### Instance Methods

#### write(dutyCycle)

Sets the duty cycle for the PWM output, a floating point value between 0 and 1.

_Arguments_:

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>dutyCycle</td>
    <td>Number</td>
    <td>The duty cycle for the PWM to set, must be a floating point number between 0 and 1</td>
  </tr>
</table>

_Returns_: None

**Note:** The PWM does not start outputting a signal until write is called for the first time.

License
=======

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
