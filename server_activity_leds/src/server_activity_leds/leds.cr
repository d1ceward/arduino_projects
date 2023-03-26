module ServerActivityLeds
  # This class updates the LED status based on the disk and network activity.
  class Leds
    # Updates the LED status based on the disk and network activity.
    def self.update_led_status(disk_report : String?, net_report : String?, prev_disk_report : String?,
                               prev_net_report : String?)
      diff_disk = disk_report != prev_disk_report
      diff_net = net_report != prev_net_report

      if diff_disk && diff_net
        File.write(ServerActivityLeds::Serial::FILE, "1\n")
      elsif !diff_disk && !diff_net
        File.write(ServerActivityLeds::Serial::FILE, "0\n")
      else
        File.write(ServerActivityLeds::Serial::FILE, diff_disk ? "2\n" : "3\n")
        File.write(ServerActivityLeds::Serial::FILE, diff_net ? "4\n" : "5\n")
      end
    end
  end
end
