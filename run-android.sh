#! /bin/bash
#Script para criar conectar no celular físico via rede e ai se conectar
# com o banco de dados
npx react-native start | adb tcpip 6000
sleep 3 && echo "conectando na porta 6000"
adb connect 10.0.0.101:6000
sleep 3 && echo "conectando  ao ip 10.0.0.101"
adb devices
npx react-native run-android
