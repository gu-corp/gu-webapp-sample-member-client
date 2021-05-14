const wdio = require('wdio');
const assert = require('chai').assert;
 
describe('Top page', function() {
    this.timeout(60000);
 
    // Create a webdriver.io 'browser' object. Now you can call on this object every
    // method described on http://webdriver.io/api.html
    var browser = wdio.getBrowser({
        desiredCapabilities: {
            browserName: 'chrome'
        }
    });
 
    // Initialize selenium standalone server if it is not started yet
    before(wdio.initSelenium);
 
    // Every code using the 'browser' object has to be wrapped by wdio.wrap
    before(wdio.wrap(function() {
        browser.init();
    }));
 
    after(wdio.wrap(function() {
        browser.end();
    }));
 
    // If you use Mocha test framework then wrap every single test by wdio.wrap
    // Important: Using wdio.wrap on 'describe' method is invalid.
    // Use it only for: 'it', 'before', 'after', 'beforeEach' and 'afterEach'
    it('Should return "Google" when asked about page title', wdio.wrap(function () {
        browser.url('http://localhost:3000/');
        // browser.url('http://www.google.com');
        assert.equal('', browser.getTitle());
    }));
});