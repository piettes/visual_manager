tsc -p ../animations/ && rm -rf node_modules/animations/ && npm install ../animations/
rsync -r ./node_modules/animations/* pi@pi:/home/pi/repos/visual_manager/neopixelclient/node_modules/animations/
rsync -r ./src/* pi@pi:/home/pi/repos/visual_manager/neopixelclient/src/
