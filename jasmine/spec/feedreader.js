/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed in the allFeeds object
         * and ensures url property has been defined and
         * that it is not empty.
         */
        it('URL are defined', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* loops through each feed in the allFeeds object
         * and ensures name property has been defined and
         * that it is not empty.
         */
        it('name are defined', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    describe('The menu', function () {
        var bodyElement;

        beforeEach(function () {
            bodyElement = $('body');
        });

        /* A test that ensures the menu element is hidden by default. */
        it('hidden by default', function () {
            expect(bodyElement.hasClass('menu-hidden')).toBe(true);
        });

        /* ensures the menu changes visibility when the menu icon is clicked.
         * This test has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function () {
            var menuIcon = $('.menu-icon-link');

            menuIcon.trigger('click');
            expect(bodyElement.hasClass('menu-hidden')).toBe(false);

            menuIcon.trigger('click');
            expect(bodyElement.hasClass('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* ensures when the loadFeed function is called and
         * completes its work, there is at least  a single
         * .entry element within the .feed container. loadFeed()
         * is asynchronous so this test require the use of
         * Jasmine's beforeEach and asynchronous done() function.
         */
        it('at least a single entry in a feed', function (done) {
            var entriesLen = $('.feed .entry').length;
            expect(entriesLen).toBeGreaterThan(0);
            done();
        });
    });


    describe('New Feed Selection', function () {
        var oldFeed,
            newFeed;

        beforeEach(function (done) {
            loadFeed(0, function () {
                // store old feed
                oldFeed = $('.feed').html();
                done();
            })
        })

        beforeEach(function (done) {
            loadFeed(1, function () {
                // fetch new feed
                newFeed = $('.feed').html();
                done();
            })
        })

        /* ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes.
         * loadFeed() is asynchronous. Load two different RSS feeds
         * and comparing their content.
         */
        it('that new feed is loaded', function (done) {
            expect(newFeed).not.toEqual(oldFeed);
            done();
        })
    });
}());
