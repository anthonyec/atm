# Robotic Oracle

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

## Production
### Enviroment Variables
Fill out and add these to `~/.bshrc`. Run `. ~/.bashrc` to reload the vars for the current shell.

```
export PARTICLE_TOKEN=''
export TWILIO_SID=''
export TWILIO_TOKEN=''
export TWILIO_PHONE_NUMBER=''
export NODE_ENV='' # development | production

export DB_HOSTNAME=''
export DB_NAME=''
export DB_PASSWORD=''
export DB_USERNAME=''
export TCP_URL=''
export TCP_PORT=''
```

### SSH
Production is hosted on DigitalOcean

```
$ ssh root@139.59.173.196
```


### Starting app on Digital ocean

Using https://github.com/foreverjs/forever to run node app in the background.

To start the app

1. SSH into the root
```
$ ssh root@139.59.173.196
```

2. Go into the atm folder
```
$ cd atm
```

3. Start the app
```
$ forever start app.js
```

Optionally to stop the app
```
$ forever stop app.js
```

## Testing

Manually testing posting the message
```
$ curl -X POST http://localhost:4000/sms -d "Body=n79bu&From=122"
```

### See log files of running app
```
$ forever list
```

shows log file being used by the currently running application in logfile colum
e.g (/root/.forever/D9ap.log)
```
$ cd /root/.forever/
```

```
` tail D9ap.log
```



## Misc info
### Printer Specs
- 32 characters per line
- 384 pixels width

### WiFi
SSID: ATM_2.4G

PASS: c0pb0trulez

