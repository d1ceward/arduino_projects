# server_activity_leds

Following the addition of M.2 RAID expansion cards on my custom servers, they have lost the flashing of the front LEDs indicating the read/write activity of the disks. So here is a project that aims to get them working again and also add a front LED that indicates network activity.

### How ?

The principle is quite simple, a software on the server monitors the activity of the disks and the network and sends activation/deactivation signals of the leds by USB to an Arduino Uno R3 board which takes care of turning on/off the corresponding LEDs.

```
ln -s /opt/server_activity_leds/server_activity_leds.service /etc/systemd/system/server_activity_leds.service
```
