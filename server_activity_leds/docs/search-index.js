crystal_doc_search_index_callback({"repository_name":"server_activity_leds","body":"# server_activity_leds\n\nFollowing the addition of M.2 RAID expansion cards on my custom servers, they have lost the flashing of the front LEDs indicating the read/write activity of the disks. So here is a project that aims to get them working again and also add a front LED that indicates network activity.\n\n### How ?\n\nThe principle is quite simple, a software on the server monitors the activity of the disks and the network and sends activation/deactivation signals of the leds by USB to an Arduino Uno R3 board which takes care of turning on/off the corresponding LEDs.\n","program":{"html_id":"server_activity_leds/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"locations":[],"repository_name":"server_activity_leds","program":true,"enum":false,"alias":false,"const":false,"types":[{"html_id":"server_activity_leds/ServerActivityLeds","path":"ServerActivityLeds.html","kind":"module","full_name":"ServerActivityLeds","name":"ServerActivityLeds","abstract":false,"locations":[{"filename":"src/server_activity_leds/disk_stats.cr","line_number":1,"url":null},{"filename":"src/server_activity_leds/leds.cr","line_number":1,"url":null},{"filename":"src/server_activity_leds/net_stats.cr","line_number":1,"url":null},{"filename":"src/server_activity_leds/serial.cr","line_number":1,"url":null},{"filename":"src/version.cr","line_number":1,"url":null}],"repository_name":"server_activity_leds","program":false,"enum":false,"alias":false,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"\"0.1.0\""}],"types":[{"html_id":"server_activity_leds/ServerActivityLeds/DiskStats","path":"ServerActivityLeds/DiskStats.html","kind":"class","full_name":"ServerActivityLeds::DiskStats","name":"DiskStats","abstract":false,"superclass":{"html_id":"server_activity_leds/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"server_activity_leds/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"server_activity_leds/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/server_activity_leds/disk_stats.cr","line_number":3,"url":null}],"repository_name":"server_activity_leds","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"server_activity_leds/ServerActivityLeds","kind":"module","full_name":"ServerActivityLeds","name":"ServerActivityLeds"},"doc":"This class reads the disk statistics from `/proc/diskstats`.","summary":"<p>This class reads the disk statistics from <code>/proc/diskstats</code>.</p>","class_methods":[{"html_id":"report(disk_label:String):String|Nil-class-method","name":"report","doc":"Returns the disk statistics as a string.","summary":"<p>Returns the disk statistics as a string.</p>","abstract":false,"args":[{"name":"disk_label","external_name":"disk_label","restriction":"String"}],"args_string":"(disk_label : String) : String | Nil","args_html":"(disk_label : String) : String | Nil","location":{"filename":"src/server_activity_leds/disk_stats.cr","line_number":5,"url":null},"def":{"name":"report","args":[{"name":"disk_label","external_name":"disk_label","restriction":"String"}],"return_type":"String | ::Nil","visibility":"Public","body":"((File.read(\"/proc/diskstats\")).split(\"\\n\")).find(&.includes?(disk_label))"}}]},{"html_id":"server_activity_leds/ServerActivityLeds/Leds","path":"ServerActivityLeds/Leds.html","kind":"class","full_name":"ServerActivityLeds::Leds","name":"Leds","abstract":false,"superclass":{"html_id":"server_activity_leds/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"server_activity_leds/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"server_activity_leds/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/server_activity_leds/leds.cr","line_number":3,"url":null}],"repository_name":"server_activity_leds","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"server_activity_leds/ServerActivityLeds","kind":"module","full_name":"ServerActivityLeds","name":"ServerActivityLeds"},"doc":"This class updates the LED status based on the disk and network activity.","summary":"<p>This class updates the LED status based on the disk and network activity.</p>","class_methods":[{"html_id":"update_led_status(disk_report:String|Nil,net_report:String|Nil,prev_disk_report:String|Nil,prev_net_report:String|Nil)-class-method","name":"update_led_status","doc":"Updates the LED status based on the disk and network activity.","summary":"<p>Updates the LED status based on the disk and network activity.</p>","abstract":false,"args":[{"name":"disk_report","external_name":"disk_report","restriction":"String | ::Nil"},{"name":"net_report","external_name":"net_report","restriction":"String | ::Nil"},{"name":"prev_disk_report","external_name":"prev_disk_report","restriction":"String | ::Nil"},{"name":"prev_net_report","external_name":"prev_net_report","restriction":"String | ::Nil"}],"args_string":"(disk_report : String | Nil, net_report : String | Nil, prev_disk_report : String | Nil, prev_net_report : String | Nil)","args_html":"(disk_report : String | Nil, net_report : String | Nil, prev_disk_report : String | Nil, prev_net_report : String | Nil)","location":{"filename":"src/server_activity_leds/leds.cr","line_number":5,"url":null},"def":{"name":"update_led_status","args":[{"name":"disk_report","external_name":"disk_report","restriction":"String | ::Nil"},{"name":"net_report","external_name":"net_report","restriction":"String | ::Nil"},{"name":"prev_disk_report","external_name":"prev_disk_report","restriction":"String | ::Nil"},{"name":"prev_net_report","external_name":"prev_net_report","restriction":"String | ::Nil"}],"visibility":"Public","body":"diff_disk = disk_report != prev_disk_report\ndiff_net = net_report != prev_net_report\nif diff_disk && diff_net\n  File.write(ServerActivityLeds::Serial::FILE, \"1\\n\")\nelse\n  if (!diff_disk) && (!diff_net)\n    File.write(ServerActivityLeds::Serial::FILE, \"0\\n\")\n  else\n    File.write(ServerActivityLeds::Serial::FILE, diff_disk ? \"2\\n\" : \"3\\n\")\n    File.write(ServerActivityLeds::Serial::FILE, diff_net ? \"4\\n\" : \"5\\n\")\n  end\nend\n"}}]},{"html_id":"server_activity_leds/ServerActivityLeds/NetStats","path":"ServerActivityLeds/NetStats.html","kind":"class","full_name":"ServerActivityLeds::NetStats","name":"NetStats","abstract":false,"superclass":{"html_id":"server_activity_leds/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"server_activity_leds/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"server_activity_leds/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/server_activity_leds/net_stats.cr","line_number":3,"url":null}],"repository_name":"server_activity_leds","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"server_activity_leds/ServerActivityLeds","kind":"module","full_name":"ServerActivityLeds","name":"ServerActivityLeds"},"doc":"This class reads the network statistics from `/proc/net/dev`.","summary":"<p>This class reads the network statistics from <code>/proc/net/dev</code>.</p>","class_methods":[{"html_id":"report(interface:String):String|Nil-class-method","name":"report","doc":"Returns the network statistics for the specified interface as a string.","summary":"<p>Returns the network statistics for the specified interface as a string.</p>","abstract":false,"args":[{"name":"interface","external_name":"interface","restriction":"String"}],"args_string":"(interface : String) : String | Nil","args_html":"(interface : String) : String | Nil","location":{"filename":"src/server_activity_leds/net_stats.cr","line_number":5,"url":null},"def":{"name":"report","args":[{"name":"interface","external_name":"interface","restriction":"String"}],"return_type":"String | ::Nil","visibility":"Public","body":"((File.read(\"/proc/net/dev\")).split(\"\\n\")).find(&.includes?(interface))"}}]},{"html_id":"server_activity_leds/ServerActivityLeds/Serial","path":"ServerActivityLeds/Serial.html","kind":"class","full_name":"ServerActivityLeds::Serial","name":"Serial","abstract":false,"superclass":{"html_id":"server_activity_leds/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"server_activity_leds/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"server_activity_leds/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/server_activity_leds/serial.cr","line_number":2,"url":null}],"repository_name":"server_activity_leds","program":false,"enum":false,"alias":false,"const":false,"constants":[{"id":"BAUD_RATE","name":"BAUD_RATE","value":"Termios::BaudRate::B4800"},{"id":"FILE","name":"FILE","value":"\"/dev/ttyACM0\""}],"namespace":{"html_id":"server_activity_leds/ServerActivityLeds","kind":"module","full_name":"ServerActivityLeds","name":"ServerActivityLeds"},"class_methods":[{"html_id":"set_serial_file_termios-class-method","name":"set_serial_file_termios","doc":"Configures the termios settings of the serial file.\nRaises an exception if the file is invalid or cannot be accessed.","summary":"<p>Configures the termios settings of the serial file.</p>","abstract":false,"location":{"filename":"src/server_activity_leds/serial.cr","line_number":8,"url":null},"def":{"name":"set_serial_file_termios","visibility":"Public","body":"File.open(FILE, \"w\") do |serial_file|\n  if serial_file.tty?\n  else\n    raise(\"Invalid serial file\")\n  end\n  mode = LibC::Termios.new\n  fd = serial_file.fd\n  if (LibC.tcgetattr(fd, pointerof(mode))) == 0\n  else\n    raise(\"Can't access serial file\")\n  end\n  mode.c_cflag = mode.c_cflag & (~Termios::ControlMode::HUPCL.value)\n  LibC.cfsetispeed(pointerof(mode), BAUD_RATE)\n  LibC.cfsetospeed(pointerof(mode), BAUD_RATE)\n  LibC.tcsetattr(fd, Termios::LineControl::TCSANOW, pointerof(mode))\nend"}}]}]}]}})