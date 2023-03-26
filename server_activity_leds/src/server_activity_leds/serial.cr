module ServerActivityLeds
  class Serial
    FILE = "/dev/ttyACM0"
    BAUD_RATE = Termios::BaudRate::B4800

    # Configures the termios settings of the serial file.
    # Raises an exception if the file is invalid or cannot be accessed.
    def self.set_serial_file_termios
      File.open(FILE, "w") do |serial_file|
        # Check if the file is a TTY.
        raise "Invalid serial file" unless serial_file.tty?

        # Create a new termios structure and retrieve the current settings of the file.
        mode = LibC::Termios.new
        fd = serial_file.fd
        raise "Can't access serial file" unless LibC.tcgetattr(fd, pointerof(mode)) == 0

        # Configure the termios settings.
        mode.c_cflag &= ~Termios::ControlMode::HUPCL.value
        LibC.cfsetispeed(pointerof(mode), BAUD_RATE)
        LibC.cfsetospeed(pointerof(mode), BAUD_RATE)

        # Apply the new termios settings to the file.
        LibC.tcsetattr(fd, Termios::LineControl::TCSANOW, pointerof(mode))
      end
    end
  end
end
