require "./version"
require "./server_activity_leds/disk_stats"
require "./server_activity_leds/leds"
require "./server_activity_leds/libc"
require "./server_activity_leds/net_stats"
require "./server_activity_leds/serial"

ServerActivityLeds::Serial.set_serial_file_termios

# The name of the disk to monitor.
disk_label = ENV["SAL_DISK_LABEL"]? || "sda"

# The name of the network interface to monitor.
interface = ENV["SAL_NET_INTERFACE"]? || "eth0"

# Initialize the previous disk and network reports.
prev_disk_report = ServerActivityLeds::DiskStats.report(disk_label)
prev_net_report = ServerActivityLeds::NetStats.report(interface)

# Loop indefinitely, reading disk and network reports and updating the LED status.
loop do
  disk_report = ServerActivityLeds::DiskStats.report(disk_label)
  net_report = ServerActivityLeds::NetStats.report(interface)

  ServerActivityLeds::Leds.update_led_status(disk_report, net_report, prev_disk_report, prev_net_report)

  prev_disk_report = disk_report
  prev_net_report = net_report

  sleep(0.1)
end
