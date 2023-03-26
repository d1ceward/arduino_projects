module ServerActivityLeds
  # This class reads the network statistics from `/proc/net/dev`.
  class NetStats
    # Returns the network statistics for the specified interface as a string.
    def self.report(interface : String) : String?
      File.read("/proc/net/dev").split("\n").find(&.includes?(interface))
    end
  end
end
