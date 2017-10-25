import { Type } from 'serializer.ts/Decorators';

export class Device {
	name: string;
	displayname: string;

    constructor(name: string, displayname: string) {
        this.name = name;
        this.displayname = displayname;
    }

    public static filterDevices<T extends Device>(names: string[], devices: T[]): T[] {
        if (names == null || devices == null) {
            return [];
        }

        return devices.filter(d => names.includes(d.name));
    }
}

export class Input extends Device {
	icon: string;

    constructor(name: string, displayname: string, icon: string) {
        super(name, displayname);
        this.icon = icon;
    }

    public static getInput(name: string, inputs: Input[]): Input {
        return inputs.find(i => i.name == name);
    }
}

export class Output extends Device {
    power: string;
    input: Input;

    constructor(name: string, displayname: string, power: string, input: Input) {
        super(name, displayname); 
        this.power = power;
        this.input = input;
    }
}

export class Display extends Output {
	blanked: boolean;

    constructor(name: string, displayname: string, power: string, input: Input, blanked: boolean) {
        super(name, displayname, power, input);
        this.blanked = blanked;
    }
}

export class AudioDevice extends Output {
	muted: boolean;
	volume: number;

    constructor(name: string, displayname: string, power: string, input: Input, muted: boolean, volume: number) {
        super(name, displayname, power, input);
        this.muted = muted;
        this.volume = volume;
    }
}
