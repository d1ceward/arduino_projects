require "./version"
require "./server_activity_leds/libc"
require "./server_activity_leds/serial"

ServerActivityLeds::Serial.set_serial_file_termios

disk_report = nil
net_report = nil
previous_disk_report = File.read("/proc/diskstats")
previous_net_report = File.read("/proc/net/dev").split('\n').find { |i| i.includes?("eno1") }

loop do
  disk_report = File.read("/proc/diskstats")
  net_report = File.read("/proc/net/dev").split('\n').find { |i| i.includes?("eno1") }

  diff_disk = disk_report != previous_disk_report
  diff_net = net_report != previous_net_report

  if diff_disk && diff_net
    File.write(ServerActivityLeds::Serial::SERIAL_FILE, "1\n")
  elsif !diff_disk && !diff_net
    File.write(ServerActivityLeds::Serial::SERIAL_FILE, "0\n")
  else
    File.write(ServerActivityLeds::Serial::SERIAL_FILE, diff_disk ? "2\n" : "3\n")
    File.write(ServerActivityLeds::Serial::SERIAL_FILE, diff_net ? "4\n" : "5\n")
  end

  previous_disk_report = disk_report
  previous_net_report = net_report

  sleep(0.05)
end
