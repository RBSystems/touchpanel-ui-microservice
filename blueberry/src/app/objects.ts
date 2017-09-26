export class Room {
	config: RoomConfiguration;
	status: RoomStatus;
}

export class RoomConfiguration {
	id: number;
	name: string;
	description: string;
	devices: Device[];
//	configurationID: number;
//	configuration: Configuration;
//	roomDesignation: string;
}

export class RoomStatus {
	displays: DeviceStatus[];
	audioDevices: DeviceStatus[];
}

export class DeviceStatus {
	name: string;
	power: string;
	input: string;
	blanked: boolean;
	muted: boolean;
	volume: number;
}

export class Device {
	id: number;
	name: string;
	displayname: string;
	address: string;
	input: boolean;
	output: boolean;
	type: string;
	roles: string;

	hasRole(role: string): boolean {
		for (let r of this.roles) {
			if (r == role) {
				return true;
			}
		}
		return false;
	}
}

export class Event {
	type: number;
	eventCause: number;
	requestor: string;
	device: string;
	eventInfoKey: string;
	eventInfoValue: string;
}

export class OutputDevice {
	name: string;
	displayname: string;
	icon: string;

	blanked: boolean;
	input: InputDevice;

	inputs: InputDevice[];
	defaultinput: InputDevice;
}

export class InputDevice {
	name: string;
	displayname: string;
	icon: string;
}
