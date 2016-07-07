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