#! /bin/bash

adb tcpip 6000
sleep 3 && echo "conectar na porta 6000"
adb connect 10.0.0.101:6000
sleep 3 && echo "conectando ao ip 10.0.0.101"
adb devices
npx react-native run-android
