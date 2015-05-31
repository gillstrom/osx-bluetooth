/*
 * Command-line utility to control Bluetooth.
 *
 * This software is public domain. It is provided without any warranty whatsoever,
 * and may be modified or used without attribution.
 *
 * Written by Frederik Seiffert
 */

#import <Foundation/Foundation.h>

inline int BTPowerState() {
	return IOBluetoothPreferenceGetControllerPowerState();
}

int BTSetPowerState(int powerState) {
	IOBluetoothPreferenceSetControllerPowerState(powerState);
	usleep(2000000); // wait until BT has been set

	if (BTPowerState() != powerState) {
		printf("Error: unable to turn Bluetooth %s\n", powerState ? "on" : "off");
		return EXIT_FAILURE;
	}

	return EXIT_SUCCESS;
}

void BTStatus() {
	printf("Status: %s\n", BTPowerState() ? "on" : "off");
}

int main(int argc, const char * argv[]) {
	NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
	int result = EXIT_SUCCESS;

	if (!IOBluetoothPreferencesAvailable()) {
		printf("Error: Bluetooth not available");
		result = EXIT_FAILURE;
	} else if (argc == 2 && strcmp(argv[1], "status") == 0) {
		BTStatus();
	} else if (argc == 2 && strcmp(argv[1], "on") == 0) {
		result = BTSetPowerState(1);
	} else if (argc == 2 && strcmp(argv[1], "off") == 0) {
		result = BTSetPowerState(0);
	} else {
		printf("Usage: %s [status|on|off]\n", argv[0]);
		result = EXIT_FAILURE;
	}

	[pool release];
	return result;
}
