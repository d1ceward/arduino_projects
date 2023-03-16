module ServerActivityLeds
  class Serial
    SERIAL_FILE = "/dev/ttyACM0"

    def self.set_serial_file_termios
      serial_file = File.open(SERIAL_FILE)
      raise "Invalid serial file" unless serial_file.tty?

      fd = serial_file.fd
      raise "Can't access serial file" unless LibC.tcgetattr(fd, out mode) == 0

      mode.c_iflag |= Termios::ControlMode::HUPCL.value

      LibC.cfsetispeed(pointerof(mode), Termios::BaudRate::B9600)
      LibC.cfsetospeed(pointerof(mode), Termios::BaudRate::B9600)

      LibC.tcsetattr(fd, Termios::LineControl::TCSANOW, pointerof(mode))

      serial_file.close
    end
  end
end
