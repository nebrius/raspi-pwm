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

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _raspiPeripheral = require('raspi-peripheral');

var _buildReleaseAddon = require('../build/Release/addon');

var _buildReleaseAddon2 = _interopRequireDefault(_buildReleaseAddon);

var PWM = (function (_Peripheral) {
  _inherits(PWM, _Peripheral);

  function PWM(config) {
    _classCallCheck(this, PWM);

    var pin = 'PWM0';
    var clockDivisor = 400;
    var range = 1000;
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
    _get(Object.getPrototypeOf(PWM.prototype), 'constructor', this).call(this, pin);
    _buildReleaseAddon2['default'].init(this.pins[0], clockDivisor, range);
  }

  _createClass(PWM, [{
    key: 'write',
    value: function write(value) {
      if (!this.alive) {
        throw new Error('Attempted to write to a destroyed peripheral');
      }
      if (typeof value != 'number' || value < 0 || value > 1024) {
        throw new Error('Invalid PWM value ' + value);
      }
      _buildReleaseAddon2['default'].write(this.pins[0], value);
    }
  }]);

  return PWM;
})(_raspiPeripheral.Peripheral);

exports.PWM = PWM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBd0IyQixrQkFBa0I7O2lDQUMzQix3QkFBd0I7Ozs7SUFFN0IsR0FBRztZQUFILEdBQUc7O0FBQ0gsV0FEQSxHQUFHLENBQ0YsTUFBTSxFQUFFOzBCQURULEdBQUc7O0FBRVosUUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDO0FBQ2pCLFFBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUN2QixRQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxFQUFFO0FBQzFELFNBQUcsR0FBRyxNQUFNLENBQUM7S0FDZCxNQUFNLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxFQUFFO0FBQ3BDLFVBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxJQUFJLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFO0FBQ2xFLFdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO09BQ2xCO0FBQ0QsVUFBSSxPQUFPLE1BQU0sQ0FBQyxZQUFZLElBQUksUUFBUSxFQUFFO0FBQzFDLG9CQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztPQUNwQztBQUNELFVBQUksT0FBTyxNQUFNLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBRTtBQUNuQyxhQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztPQUN0QjtLQUNGO0FBQ0QsK0JBbEJTLEdBQUcsNkNBa0JOLEdBQUcsRUFBRTtBQUNYLG1DQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztHQUMvQzs7ZUFwQlUsR0FBRzs7V0FzQlQsZUFBQyxLQUFLLEVBQUU7QUFDWCxVQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNmLGNBQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztPQUNqRTtBQUNELFVBQUksT0FBTyxLQUFLLElBQUksUUFBUSxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksRUFBRTtBQUN6RCxjQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxDQUFDO09BQy9DO0FBQ0QscUNBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbEM7OztTQTlCVSxHQUFHIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTQgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IFBlcmlwaGVyYWwgfSBmcm9tICdyYXNwaS1wZXJpcGhlcmFsJztcbmltcG9ydCBhZGRvbiBmcm9tICcuLi9idWlsZC9SZWxlYXNlL2FkZG9uJztcblxuZXhwb3J0IGNsYXNzIFBXTSBleHRlbmRzIFBlcmlwaGVyYWwge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBsZXQgcGluID0gJ1BXTTAnO1xuICAgIGxldCBjbG9ja0Rpdmlzb3IgPSA0MDA7XG4gICAgbGV0IHJhbmdlID0gMTAwMDtcbiAgICBpZiAodHlwZW9mIGNvbmZpZyA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgY29uZmlnID09ICdzdHJpbmcnKSB7XG4gICAgICBwaW4gPSBjb25maWc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnID09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy5waW4gPT0gJ251bWJlcicgfHwgdHlwZW9mIGNvbmZpZy5waW4gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGluID0gY29uZmlnLnBpbjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLmNsb2NrRGl2aXNvciA9PSAnbnVtYmVyJykge1xuICAgICAgICBjbG9ja0Rpdmlzb3IgPSBjb25maWcuY2xvY2tEaXZpc29yO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBjb25maWcucmFuZ2UgPT0gJ251bWJlcicpIHtcbiAgICAgICAgcmFuZ2UgPSBjb25maWcucmFuZ2U7XG4gICAgICB9XG4gICAgfVxuICAgIHN1cGVyKHBpbik7XG4gICAgYWRkb24uaW5pdCh0aGlzLnBpbnNbMF0sIGNsb2NrRGl2aXNvciwgcmFuZ2UpO1xuICB9XG5cbiAgd3JpdGUodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuYWxpdmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIHdyaXRlIHRvIGEgZGVzdHJveWVkIHBlcmlwaGVyYWwnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnbnVtYmVyJyB8fCB2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDI0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgUFdNIHZhbHVlICcgKyB2YWx1ZSk7XG4gICAgfVxuICAgIGFkZG9uLndyaXRlKHRoaXMucGluc1swXSwgdmFsdWUpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
