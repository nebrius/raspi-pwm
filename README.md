Raspi PWM
==========

Raspi PWM is part of the [Raspi.js suite](https://github.com/bryan-m-hughes/raspi) that provides access to the hardware PWM on pin 12 (GPIO18).

## Installation

First, be sure that you have installed [raspi](https://github.com/bryan-m-hughes/raspi).

Install with NPM:

```Shell
npm install raspi-pwm
```

In rare cases, you may need to install [node-gyp](https://www.npmjs.org/package/node-gyp) manually:

```Shell
npm install -g node-gyp
```

## Example Usage

```JavaScript
var raspi = require('raspi');
var PWM = require('raspi-pwm').PWM;

raspi.init(function() {
  var pwm = new PWM();
  pwm.write(72); // Center a servo 
});
```

## API

### new PWM(pin)

Instantiates a new PWM instance on the given pin. Note that PWM is limited to only 1 pin on the Model A/B and 2 pins on the A+/B+/2. Check the [wiring information wiki](https://github.com/bryan-m-hughes/raspi-io/wiki) for more information.

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
    <td>pin</td>
    <td>Number</td>
    <td>The pin number or descriptor for the peripheral.</td>
  </tr>
</table>

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

Note: The PWM does not start outputting a signal until write is called for the first time.

License
=======

The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes bryan@theoreticalideations.com (https://theoreticalideations.com)

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
