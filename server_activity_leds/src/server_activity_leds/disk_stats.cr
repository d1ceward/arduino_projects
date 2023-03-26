module ServerActivityLeds
  # This class reads the disk statistics from `/proc/diskstats`.
  class DiskStats
    # Returns the disk statistics as a string.
    def self.report(disk_label : String) : String?
      File.read("/proc/diskstats").split("\n").find(&.includes?(disk_label))
    end
  end
end
