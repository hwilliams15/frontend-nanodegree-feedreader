/* feedreader.js
 */
$(function() {

    /* This test suite ensures that the allFeeds variable is setup as expected
     * 1) It's defined
     * 2) It's not empty
     * 3) All feeds have nonempty names and URLs
     */
    describe('RSS Feeds', function() {

        //Ensure all feeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Ensures all feed URLs have a nonempty URL
        it('have nonempty URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null);
                expect(feed.url.trim()).not.toBe('');
            });
        });


        // Ensures all feed URLs have a nonempty name
        it('have nonempty names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
                expect(feed.name.trim()).not.toBe('');
            });
        });
    });


    describe('The menu', function() {

        var body = $('body');
        // Ensures that the menu element is hidden by default.
        it('is hidden by default', function() {
            expect(body.length).toBe(1);
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        /* Ensures the menu changes visibility when the menu
         * icon is clicked.
         */
        describe('when icon clicked', function() {
            var menuIconLink = $('.menu-icon-link');

            it('should be opened', function() {
                expect(menuIconLink.length).toBe(1);
                //open the menu
                menuIconLink.trigger('click');
                expect(body.hasClass('menu-hidden')).toBeFalsy();
                //close back
                menuIconLink.trigger('click');
            });
            it('should be closed', function() {
                expect(menuIconLink.length).toBe(1);
                //open the menu
                menuIconLink.trigger('click');
                //close the menu
                menuIconLink.trigger('click');
                expect(body.hasClass('menu-hidden')).toBeTruthy();
            });
        });
    });

    describe('Initial entries', function(done) {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        it('have at least one entry in the feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function(done) {
        var beforeContent;

        //loads the first feed and then the second
        beforeEach(function(done) {

            loadFeed(1, function() {
                beforeContent = $('.feed').html();
                loadFeed(2, done);
            });
        });

        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('has different content from previous feed', function(done) {
            var feed = $('.feed');
            expect(feed.length).not.toBe(0);
            var afterContent = feed.html();
            expect(beforeContent).toBeDefined();
            expect(afterContent).toBeDefined();
            expect(beforeContent).not.toEqual(afterContent);
            done();
        });

    });

}());
