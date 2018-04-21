## 6.0.0 (2018-4-21)

- Updated pigpio to v1
- BREAKING CHANGE: dropped support for Node.js 4

## 5.0.0 (2017-9-12)

- POTENTIALLY BREAKING CHANGE: renamed the following private properties to begin with an underscore because I just learned TypeScript doesn't do anything to hide private properties. Don't use these properties, changes may not be semver-major next time.
    - `PWM.frequencyValue` -> `PWM._frequencyValue`
    - `PWM.dutyCycleValue` -> `PWM._dutyCycleValue`
    - `PWM.pwmPort` -> `PWM._pwmPort`
    - `PWM.pwm` -> `PWM._pwm`
- BREAKING CHANGE: dropped support for Node.js < 4.0.0, and now enforce it via package.json "engines" field.
- SORT OF BREAKING-ISH CHANGE: dropped support for attempting to install on non-arm platforms via package.json's "cpu" field.
    - Attempting to install this on a non-Raspberry Pi platform before gave a bunch of obtuse errors, so this doesn't _actually_ change the ability to install raspi-pwm, but does make it fail earlier and harder.

## 4.0.2 (2017-4-25)

- Fixed a bug in the TypeScript definitions that said `frequencey` was required when in reality it's not.

## 4.0.1 (2017-4-23)

- Updated documentation

## 4.0.0 (2017-4-23)

- Removed Wiring Pi and replaced it with pigpio.
- BREAKING CHANGE: removed the `range` and `clockDivisor` constructor options and instance properties
- Added `frequency` constructor option and instance property. Replace the use of `range` and `clockDivisor` with this property.
- BREAKING CHANGE: `write` now takes a floating point number between 0 and 1, instead of an integer between 0 and 1024.

## 3.1.3 (2017-22-1)

- Publishing a new version to update the README on npmjs.com. No other changes.

## 3.1.2 (2016-12-21)

- Fixed a TypeScript API definition bug where the constructor config was not marked as optional
  - Note: this does not affect functionality unless you were using the TypeScript definition

## 3.1.1 (2016-12-3)

- Converted the project to TypeScript and cleaned up a bunch of odds and ends
  - Note: there is no functionality change or bug fixes with this release

## 3.1.0 (2016-7-7)

- Switched dependency ranges to ^
- Bumped dependencies to bring in support for a new Raspberry Pi Zero revision

## 3.0.0 (2016-3-20)

- Dependency update to fix bug
  - POTENTIALLY BREAKING CHANGE: using the identifier `PWM1` now maps to Wiring Pi pin 23, not 24
- New build system

## 2.3.1 (2016-3-7)

- Dependency update to add missing Raspberry Pi 3 Model B revision

## 2.3.0 (2016-3-4)

- Updated dependencies to add Raspberry Pi 3 Model B support

## 2.2.0 (2016-2-18)

- Added `range` and `clockDivisor` accessors

## 2.1.0 (2015-12-8)

- Updated dependencies to add Raspberry Pi Zero support

## 2.0.0 (2015-10-20)

- Upgraded to NAN 2
  - POTENTIAL BREAKING CHANGE
  - The API has not changed, but the build requirements have
  - Make sure you are running Raspbian Jessie because this module no longer builds on stock Raspbian Wheezy
  - See https://github.com/fivdi/onoff/wiki/Node.js-v4-and-native-addons for more information

## 1.4.0 (2015-10-13)

- Exposed clock and range properties
- Dependency updates to fix bug with invalid pin aliases
- Updated build dependencies

## 1.3.3 (2015-9-3)

- Dependency updates to fix a bug with pin aliasing

## 1.3.2 (2015-7-16)

- Updated dependencies
- Updated the repository links to point to their new location
- Added a contributing guide
- Added code linter
- Update code style to use newer best practices

## 1.3.1 (2015-3-17)

- Dependency update to fix a bug with destroying peripherals

## 1.3.0 (2015-2-21)

- Switched from traceur to babel for ES6->ES5 compilation

## 1.2.2 (2015-2-20)

- Fixed a bug with mismatched versions of the traceur runtime
- Skipped 1.2.1 because of a typo on my part when publishing (oops)

## 1.2.0 (2015-2-20)

- Removed prebuilt binary support as there are now multiple targets (need to use node-pre-gyp)
- Upgraded NAN to get support for Node.js 0.12
  - io.js support is theoretically there, but won't work until https://github.com/TooTallNate/node-gyp/pull/564 is landed

## 1.1.0 (2015-2-13)

- Added support for multiple PWMs. Note: the API was extended, but is backwards compatible with 1.0.x releases

## 1.0.5 (2015-2-12)

- README updates

## 1.0.4 (2015-1-21)

- Locked down the NAN version for now since code breaks on 1.5

## 1.0.3 (2015-1-8)

- Added pre-built lib so users don't have to compile on their own Raspberry Pis.

## 1.0.2 (2014-12-29)

- Added docs
- Switched to using the 'PWM0' pin nomenclature

## 1.0.1 (2014-12-6)

- Critical bug fix (why did I even publish 1.0.0?)

## 1.0.0 (2014-11-28)

- Initial implementation
