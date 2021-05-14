npm i
./node_modules/.bin/next dev &
sleep 60
# TODO: Install selenium
./node_modules/.bin/selenium-standalone start &
sleep 60
# TODO: Use headless browser
./node_modules/.bin/mocha test/test.js
