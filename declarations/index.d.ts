import { Peripheral } from 'raspi-peripheral';
export interface IConfig {
    pin?: number | string;
    clockDivisor?: number;
    range?: number;
}
export declare class PWM extends Peripheral {
    private clockDivisorValue;
    private rangeValue;
    constructor(config?: number | string | IConfig);
    readonly clockDivisor: number;
    readonly range: number;
    write(value: number): void;
}
