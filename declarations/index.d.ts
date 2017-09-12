import { Peripheral } from 'raspi-peripheral';
export interface IConfig {
    pin?: number | string;
    frequency?: number;
}
export declare class PWM extends Peripheral {
    private _frequencyValue;
    private _dutyCycleValue;
    private _pwmPort;
    private _pwm;
    readonly frequency: number;
    readonly dutyCycle: number;
    constructor(config?: number | string | IConfig);
    destroy(): void;
    write(dutyCycle: number): void;
}
