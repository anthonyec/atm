// Need this empty line to stop big errors hmmm
#include "Adafruit_Thermal.h"

TCPClient client;
Adafruit_Thermal printer;

byte server[] = { 192, 168, 55, 107 };
int port = 2000;

byte NEW_LINE = 10;
byte LEFT_ALIGN = 15;
byte CENTER_ALIGN = 14;

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

    if (currentByte == CENTER_ALIGN) {
      Serial.println("Center align");
      printer.justify('C');
    } else if (currentByte == LEFT_ALIGN) {
      Serial.println("Left align");
      printer.justify('L');
    } else {
      Serial1.write(currentByte);
    }

    Serial.println(currentByte);
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
