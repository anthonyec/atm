// Need this empty line to stop big errors hmmm
#include "Adafruit_Thermal.h"

TCPClient client;
Adafruit_Thermal printer;

void setup() {
  // Setup WiFi. The device can store up to 5 credentials
  WiFi.setCredentials("Signal Noise", "S1gnalN01se");
  WiFi.setCredentials("EE-swnjq2", "law-exile-past");
  WiFi.setCredentials("BTHub5-8XZ8 2.4GHz", "374a648563");

  // Connect to USB serial
  Serial.begin(9600);
  Serial.println("USB connected");

  Serial1.begin(19200);
  printer.begin(&Serial1);
  Serial.println("Printer connected");

  Particle.function("printData", printData);
  Particle.function("printText", printText);

  String ssid = WiFi.SSID();
  Serial.print("[SSID]: ");
  Serial.println(ssid);

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
      case 20:
        printer.setSize('S');
        break;
      case 21:
        printer.setSize('M');
        break;
      case 22:
        printer.setSize('L');
        break;
      default:
        Serial1.write(currentByte);
    }
  }

  if (!client.connected()) {
    client.stop();
  }
}

// https://community.particle.io/t/spark-function-limits/952/6
void splitArgStringToArray(String arguments, String *target){
  int numArgs = 0;
  int beginIdx = 0;
  int idx = arguments.indexOf(";");

  while (idx != -1) {
    String arg = arguments.substring(beginIdx, idx);
    arg.trim();
    target[numArgs] = arg;

    beginIdx = idx + 1;
    idx = arguments.indexOf(";", beginIdx);
    ++numArgs;
  }

  // Single or last parameter
  String lastArg = arguments.substring(beginIdx);
  target[numArgs] = lastArg;
}

int printData(String data) {
  String args[3] = {NULL};
  splitArgStringToArray(data, args);

  String url = args[0];
  String portStr = args[1];
  String idStr = args[2];
  int port = portStr.toInt();

  Serial.println("[REQUESTING]");
  Particle.publish("tcp", "requesting");

  if (client.connect(url, port)) {
    Serial.println("[SUCCESS]");
    Particle.publish("tcp", "success");
    client.write(idStr);
    client.flush();
    return 1;
  } else {
    Serial.println("[FAILED]");
    Particle.publish("tcp", "failed");
    return 0;
  }
}

int printText(String text) {
  printer.println(text);
  printer.feed(5);
  return 1;
}
