import { Type } from 'serializer.ts/Decorators';
import { Device, Display, AudioDevice, Input } from './status.objects';

export class Room {
	config: RoomConfiguration;
	status: RoomStatus;
    uiconfig: UIConfiguration;
}

export class RoomConfiguration {
	id: number;
	name: string;
	description: string;

	@Type(() => DeviceConfiguration)
	devices: DeviceConfiguration[];

	match(n: string) {
		return n == this.name;	
	}
}

export class RoomStatus {
	@Type(() => DeviceStatus)
	displays: DeviceStatus[];

	@Type(() => DeviceStatus)
	audioDevices: DeviceStatus[];
}

export class UIConfiguration {
    api: string[];

    @Type(() => DisplayConfiguration)
    displays: DisplayConfiguration[];

    @Type(() => PanelConfiguration)
    panels: PanelConfiguration[];

    @Type(() => InputConfiguration)
    inputConfiguration: InputConfiguration[];

    roomWideAudios: string[];
}

export class PanelConfiguration {
    hostname: string;
    uipath: string;
    displays: string[];
    features: string[];
    independentAudioDevices: string[];
}

export class DisplayConfiguration {
    name: string;
    icon: string;
    inputs: string[];
    audioDevices: string[];
}

export class InputConfiguration {
    name: string;
    icon: string;
}

export class DeviceStatus {
	name: string;
	power: string;
	input: string;
	blanked: boolean;
	muted: boolean;
	volume: number;

	match(n: string) {
		return n == this.name;	
	}
}

export class DeviceConfiguration {
	id: number;
	name: string;
	display_name: string;
	address: string;
	input: boolean;
	output: boolean;
	type: string;
	roles: string;

	public hasRole(role: string): boolean {
		for (let r of this.roles) {
			if (r == role) {
				return true;
			}
		}
		return false;
	}
}

export class Panel {
    hostname: string;
    uipath: string;
    displays: Display[] = [];
    features: string[] = [];
    independentAudioDevices: AudioDevice[] = [];

    render: boolean = false;

    constructor(hostname: string, uipath: string, displays: Display[], features: string[], independentAudioDevices: AudioDevice[]) {
        this.hostname = hostname;
        this.uipath = uipath;
        this.displays = displays;
        this.features = features;
        this.independentAudioDevices = independentAudioDevices;
    }
}
