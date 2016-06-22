
TCPClient client;
// byte server[] = { 192, 168, 55, 97 };
byte server[] = { 192, 168, 1, 70 };

void setup() {
  // Connect to USB serial
  Serial.begin(9600);
  Serial.println("USB connected");
  Particle.function("requestData", requestData);

  uint32_t freemem = System.freeMemory();
  Serial.print("Free memory: ");
  Serial.println(freemem);

  size_t length = EEPROM.length();
  Serial.print("EEPROM length: ");
  Serial.println(length);
}

void loop() {
  if (client.available()) {
    byte c = client.read();
    Serial.println(c);
  }

  if (!client.connected()) {
    client.stop();
  }
}

int requestData(String url) {
  Serial.println("Requesting data");

  if (client.connect(server, 2000)) {
    Serial.println("Client connected!!!");
  } else {
    Serial.println("Client failed to connect");
  }

  return 1;
}