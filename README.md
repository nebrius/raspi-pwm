Raspi PWM
==========

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nebrius/raspi-io?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Raspi PWM is part of the [Raspi.js suite](https://github.com/nebrius/raspi) that provides access to the hardware PWM on pin 12 (GPIO18).

If you have a bug report, feature request, or wish to contribute code, please be sure to check out the [Contributing Guide](blob/master/CONTRIBUTING.md).

## Installation

First, be sure that you have installed [raspi](https://github.com/nebrius/raspi).

Install with NPM:

```Shell
npm install raspi-pwm
```

**Warning:** this module requires GCC 4.8 or newer. This means that you should be running Raspbian Jessie or newer, released in September of 2015.

**Note:** this project is written in [TypeScript](http://www.typescriptlang.org/) and includes type definitions in the package.json file. This means that if you want to use it from TypeScript, you don't need to install a separate @types module.

## Example Usage

```JavaScript
const raspi = require('raspi');
const PWM = require('raspi-pwm').PWM;

raspi.init(() => {
  const pwm = new PWM();
  pwm.write(72); // Center a servo
});
```

## Pin Naming

The pins on the Raspberry Pi are a little complicated. There are multiple headers on some Raspberry Pis with extra pins, and the pin numbers are not consistent between Raspberry Pi board versions.

To help make it easier, you can specify pins in three ways. The first is to specify the pin by function, e.g. ```'GPIO18'```. The second way is to specify by pin number, which is specified in the form "P[header]-[pin]", e.g. ```'P1-7'```. The final way is specify the [Wiring Pi virtual pin number](http://wiringpi.com/pins/), e.g. ```7```. If you specify a number instead of a string, it is assumed to be a Wiring Pi number.

Be sure to read the [full list of pins](https://github.com/nebrius/raspi-io/wiki/Pin-Information) on the supported models of the Raspberry Pi.


## API

### new PWM(config)

Instantiates a new PWM instance on the given pin. Note that PWM is limited to only 1 pin on the Model A/B and 2 pins on the A+/B+/2/Zero. On the A/B, the PWM pin is exposed on ```GPIO18```. The A+/B+/2 is a little more complicated. The first PWM is exposed on two pins, ```GPIO18``` and ```GPIO12```. This PWM can only be active on one of these pins at a time, however, so choose carefully. The second PWM pin on the A+/B+/2/Zero is exposed on ```GPIO19```. Check the [wiring information wiki](https://github.com/nebrius/raspi-io/wiki) for more information.

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
          <td>The pin number or descriptor for the peripheral</td>
        </tr>
        <tr>
          <td>range (optional)</td>
          <td>Number</td>
          <td>Sets the range register in the PWM peripheral. This value controls how <em>many</em> clock cycles are used in one period. Use in conjunction with the clockDivisor property to set the period.</td>
        </tr>
        <tr>
          <td>clockDivisor (optional)</td>
          <td>Number</td>
          <td>Sets the clock divisor register in the PWM peripheral. This value controls how long each clock cycle is. This value is a divisor, i.e. higher values mean lower clock speeds. Use in conjunction with the range property to set the period.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

### Instance Properties

#### range

A number representing the range initialization value. If a value for `range` was passed to the constructor, it is reflected back here. If no value for `range` was passed to the constructor, then this reflects the default range value, currently 1000.

#### clockDivisor

A number representing the clock divisor initialization value. If a value for `clockDivisor` was passed to the constructor, it is reflected back here. If no value for `clockDivisor` was passed to the constructor, then this reflects the default range value, currently 400.

### Instance Methods

#### write(value)

Sets the duty cycle for the PWM output. The period is 20ms.

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
    <td>value</td>
    <td>Number</td>
    <td>The duty cycle for the PWM to set, must be between 0 and 1024</td>
  </tr>
</table>

_Returns_: None

**Note:** The PWM does not start outputting a signal until write is called for the first time.

License
=======

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
