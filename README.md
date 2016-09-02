# atm
ATM

## Flashing Photon
Compiling and flashing remotely

```sh
$ particle flash <PARTICLE_NAME> <DIR>
```

Compiling remotely and flashing locally

```sh
$ particle compile photon <DIR> --saveTo dist/firmware.bin
```

## Terminal utils
Use `netcat` to test simple server communcation

```sh
$ netcat <IP_ADDRESS> <PORT> <MESSAGE>
```

# Photon Device Modes

https://docs.particle.io/guide/getting-started/modes/core/


## Setup WiFi via USB

 - Please note, the particle **can't** connect to 5GHz networks and only supports 2.4GHz

```
particle serial wifi
```

## Printer

32 characters per line
384 pixels width
