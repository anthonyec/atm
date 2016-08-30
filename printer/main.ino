// Need this empty line to stop big errors hmmm
#include "Adafruit_Thermal.h"

TCPClient client;
Adafruit_Thermal printer;

byte server[] = { 192, 168, 55, 107 };
int port = 2000;

// byte LEFT_ALIGN = 15;
// byte CENTER_ALIGN = 14;
// byte BOLD_ON = 15;
// byte BOLD_OFF = 16;
// byte UNDERLINE_ON = 17;
// byte UNDERLINE_OFF = 18;

void setup() {
  // Setup WiFi. The device can store upto 5 credentials
  WiFi.setCredentials("Signal Noise", "S1gnalN01se");

  // Connect to USB serial
  Serial.begin(9600);
  Serial.println("USB connected");
  Serial1.begin(19200);
  printer.begin(&Serial1);
  Serial.println("Printer connected");

  Particle.function("requestData", requestData);
  Particle.function("printText", printText);

  String ssid = WiFi.SSID();
  Serial.print("SSID: ");
  Serial.println(ssid);

  int ping = WiFi.ping(server);
  Serial.print("Ping: ");
  Serial.println(ping);

  printer.setLineHeight(35);
}

void loop() {
  while(client.available()) {
    byte currentByte = client.read();

    switch(currentByte) {
      case 14:
        printer.justify('C');
        break;
      case 15:
        printer.justify('L');
        break;
      case 16:
        printer.boldOn();
        break;
      case 17:
        printer.boldOff();
        break;
      case 18:
        printer.underlineOn();
        break;
      case 19:
        printer.underlineOff();
        break;
      default:
        Serial1.write(currentByte);
    }
  }

  if (!client.connected()) {
    client.stop();
  }
}

int requestData(String url) {
  Serial.println("Requesting data");

  if (client.connect(server, port)) {
    Serial.println("Client connected!!!");
  } else {
    Serial.println("Client failed to connect");
  }

  return 1;
}

int printText(String text) {
  printer.println(text);
  return 1;
}
