'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PWM = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raspiPeripheral = require('raspi-peripheral');

var _addon = require('../build/Release/addon');

var _addon2 = _interopRequireDefault(_addon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

var PWM = exports.PWM = function (_Peripheral) {
  _inherits(PWM, _Peripheral);

  function PWM(config) {
    _classCallCheck(this, PWM);

    var pin = 'PWM0';
    var clockDivisor = 400;
    var range = 1000;
    if (typeof config == 'number' || typeof config == 'string') {
      pin = config;
    } else if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) == 'object') {
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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PWM).call(this, pin));

    _addon2.default.init(_this.pins[0], clockDivisor, range);
    Object.defineProperties(_this, {
      clockDivisor: {
        get: function get() {
          return clockDivisor;
        },

        enumerable: true
      },
      range: {
        get: function get() {
          return range;
        },

        enumerable: true
      }
    });
    return _this;
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
      _addon2.default.write(this.pins[0], value);
    }
  }]);

  return PWM;
}(_raspiPeripheral.Peripheral);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBd0JBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWE7OztBQUNYLFdBRFcsR0FDWCxDQUFZLE1BQVosRUFBb0I7MEJBRFQsS0FDUzs7QUFDbEIsUUFBSSxNQUFNLE1BQU4sQ0FEYztBQUVsQixRQUFJLGVBQWUsR0FBZixDQUZjO0FBR2xCLFFBQUksUUFBUSxJQUFSLENBSGM7QUFJbEIsUUFBSSxPQUFPLE1BQVAsSUFBaUIsUUFBakIsSUFBNkIsT0FBTyxNQUFQLElBQWlCLFFBQWpCLEVBQTJCO0FBQzFELFlBQU0sTUFBTixDQUQwRDtLQUE1RCxNQUVPLElBQUksUUFBTyx1REFBUCxJQUFpQixRQUFqQixFQUEyQjtBQUNwQyxVQUFJLE9BQU8sT0FBTyxHQUFQLElBQWMsUUFBckIsSUFBaUMsT0FBTyxPQUFPLEdBQVAsSUFBYyxRQUFyQixFQUErQjtBQUNsRSxjQUFNLE9BQU8sR0FBUCxDQUQ0RDtPQUFwRTtBQUdBLFVBQUksT0FBTyxPQUFPLFlBQVAsSUFBdUIsUUFBOUIsRUFBd0M7QUFDMUMsdUJBQWUsT0FBTyxZQUFQLENBRDJCO09BQTVDO0FBR0EsVUFBSSxPQUFPLE9BQU8sS0FBUCxJQUFnQixRQUF2QixFQUFpQztBQUNuQyxnQkFBUSxPQUFPLEtBQVAsQ0FEMkI7T0FBckM7S0FQSzs7dUVBUEUsZ0JBa0JILE1BakJZOztBQWtCbEIsb0JBQU0sSUFBTixDQUFXLE1BQUssSUFBTCxDQUFVLENBQVYsQ0FBWCxFQUF5QixZQUF6QixFQUF1QyxLQUF2QyxFQWxCa0I7QUFtQmxCLFdBQU8sZ0JBQVAsUUFBOEI7QUFDNUIsb0JBQWM7QUFDWiw0QkFBTTtBQUNKLGlCQUFPLFlBQVAsQ0FESTtTQURNOztBQUlaLG9CQUFZLElBQVo7T0FKRjtBQU1BLGFBQU87QUFDTCw0QkFBTTtBQUNKLGlCQUFPLEtBQVAsQ0FESTtTQUREOztBQUlMLG9CQUFZLElBQVo7T0FKRjtLQVBGLEVBbkJrQjs7R0FBcEI7O2VBRFc7OzBCQW9DTCxPQUFPO0FBQ1gsVUFBSSxDQUFDLEtBQUssS0FBTCxFQUFZO0FBQ2YsY0FBTSxJQUFJLEtBQUosQ0FBVSw4Q0FBVixDQUFOLENBRGU7T0FBakI7QUFHQSxVQUFJLE9BQU8sS0FBUCxJQUFnQixRQUFoQixJQUE0QixRQUFRLENBQVIsSUFBYSxRQUFRLElBQVIsRUFBYztBQUN6RCxjQUFNLElBQUksS0FBSixDQUFVLHVCQUF1QixLQUF2QixDQUFoQixDQUR5RDtPQUEzRDtBQUdBLHNCQUFNLEtBQU4sQ0FBWSxLQUFLLElBQUwsQ0FBVSxDQUFWLENBQVosRUFBMEIsS0FBMUIsRUFQVzs7OztTQXBDRiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE0IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AbmVicmkudXM+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IFBlcmlwaGVyYWwgfSBmcm9tICdyYXNwaS1wZXJpcGhlcmFsJztcbmltcG9ydCBhZGRvbiBmcm9tICcuLi9idWlsZC9SZWxlYXNlL2FkZG9uJztcblxuZXhwb3J0IGNsYXNzIFBXTSBleHRlbmRzIFBlcmlwaGVyYWwge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBsZXQgcGluID0gJ1BXTTAnO1xuICAgIGxldCBjbG9ja0Rpdmlzb3IgPSA0MDA7XG4gICAgbGV0IHJhbmdlID0gMTAwMDtcbiAgICBpZiAodHlwZW9mIGNvbmZpZyA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgY29uZmlnID09ICdzdHJpbmcnKSB7XG4gICAgICBwaW4gPSBjb25maWc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnID09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy5waW4gPT0gJ251bWJlcicgfHwgdHlwZW9mIGNvbmZpZy5waW4gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGluID0gY29uZmlnLnBpbjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLmNsb2NrRGl2aXNvciA9PSAnbnVtYmVyJykge1xuICAgICAgICBjbG9ja0Rpdmlzb3IgPSBjb25maWcuY2xvY2tEaXZpc29yO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBjb25maWcucmFuZ2UgPT0gJ251bWJlcicpIHtcbiAgICAgICAgcmFuZ2UgPSBjb25maWcucmFuZ2U7XG4gICAgICB9XG4gICAgfVxuICAgIHN1cGVyKHBpbik7XG4gICAgYWRkb24uaW5pdCh0aGlzLnBpbnNbMF0sIGNsb2NrRGl2aXNvciwgcmFuZ2UpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIGNsb2NrRGl2aXNvcjoge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIGNsb2NrRGl2aXNvcjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHJhbmdlOiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmFsaXZlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byB3cml0ZSB0byBhIGRlc3Ryb3llZCBwZXJpcGhlcmFsJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT0gJ251bWJlcicgfHwgdmFsdWUgPCAwIHx8IHZhbHVlID4gMTAyNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFBXTSB2YWx1ZSAnICsgdmFsdWUpO1xuICAgIH1cbiAgICBhZGRvbi53cml0ZSh0aGlzLnBpbnNbMF0sIHZhbHVlKTtcbiAgfVxufVxuIl19