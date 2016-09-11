# atm
# Photon
### Flashing Photon
Compiling and flashing remotely

```sh
$ particle flash <PARTICLE_NAME> <DIR>
```

### Terminal utils
Use `netcat` to test simple server communcation

```sh
$ netcat <IP_ADDRESS> <PORT> <MESSAGE>
```

Use cURL to simulate SMS messages

```sh
$ curl -X POST localhost:4000/sms --data 'From=+4477000000000&Body=EC2A 3AR'
```

### Photon Device Modes
https://docs.particle.io/guide/getting-started/modes/core/

### Setup WiFi via USB
Please note, the particle **can't** connect to 5GHz networks and only supports 2.4GHz

```
particle serial wifi
```

## Production
### Enviroment Variables
Fill out and add these to `~/.bshrc`. Run `. ~/.bashrc` to reload the vars for the current shell.

```
export PARTICLE_TOKEN=''
export TWILIO_SID=''
export TWILIO_TOKEN=''
export TWILIO_PHONE_NUMBER=''
export NODE_ENV='' # development | production
```

### SSH
Production is hosted on DigitalOcean

```
$ ssh root@178.62.113.246
```

## Misc info
### Printer Specs
- 32 characters per line
- 384 pixels width

### WiFi
SSID: ATM_2.4G

PASS: c0pb0trulez
