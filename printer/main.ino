// Need this empty line to stop big errors hmmm
// Credit: https://github.com/atheros/adafruit_thermal_sparkcore
#include "Adafruit_Thermal.h"

Adafruit_Thermal printer;

void setup() {
  Serial1.begin(19200);
  printer.begin(&Serial1);

  // Expose printLine() function to Particle cloud endpoint
  Particle.function("printLine", printLine);
}

void loop() {}

int printLine(String text) {
  printer.println(text);
  // printer.feed(2);
  return 1;
}