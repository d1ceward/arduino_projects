# Server Activity LEDs Documentation

## Project Overview

The "server_activity_leds" project aims to restore the functionality of the front LEDs on custom servers that have lost their read/write activity indicator due to the addition of M.2 RAID expansion cards. Additionally, it adds a front LED to indicate network activity. The project utilizes a software running on the server to monitor disk and network activity and sends activation/deactivation signals to an Arduino Uno R3 board via USB. The Arduino board controls the corresponding LEDs, turning them on or off based on the activity status.

## Installation

### Prerequisites
- Custom server with front LEDs
- Arduino Uno R3 board
- USB cable to connect the Arduino Uno board to the server
- Internet connection (for cloning the project repository)

### Steps

1. Clone the project repository from GitHub :

```bash
git clone git@github.com:d1ceward/arduino_projects.git
```

2. Create the installation directory :

```bash
mkdir /opt/server_activity_leds
```

3. Move the systemd service file to the installation directory :

```bash
mv arduino_projects/server_activity_leds/systemd/server_activity_leds.service /opt/server_activity_leds/server_activity_leds.service
```

4. Load the cdc_acm kernel module:

```bash
modprobe cdc_acm
```

5. Create a symbolic link for the service file:

```bash
ln -s /opt/server_activity_leds/server_activity_leds.service /etc/systemd/system/server_activity_leds.service
```

6. Enable and start the server_activity_leds service:

```bash
systemctl enable --now server_activity_leds.service
```

At this point, the installation process is complete, and the server activity LEDs should start functioning as intended.

## Usage

The `server_activity_leds` service runs automatically in the background after installation. It continuously monitors the disk and network activity on the server and controls the LEDs accordingly.

The front LEDs will indicate the following:

- Disk Activity:
  - Flashing LEDs indicate read/write activity on the disks.
- Network Activity:
  - A separate LED indicates network activity.

The LEDs will turn on or off based on the corresponding activity. The software running on the server communicates with the Arduino Uno board via USB to control the LEDs.
