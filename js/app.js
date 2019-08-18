"use strict";

/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */
// The names and URLs to all of the feeds we'd like available.
var allFeeds = [{
  name: 'Udacity Blog',
  url: 'http://blog.udacity.com/feed'
}, {
  name: 'CSS Tricks',
  url: 'http://feeds.feedburner.com/CssTricks'
}, {
  name: 'HTML5 Rocks',
  url: 'http://feeds.feedburner.com/html5rocks'
}, {
  name: 'Linear Digressions',
  url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}];
/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */

function init() {
  // Load the first feed we've defined (index of 0).
  loadFeed(0);
}
/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 */


function loadFeed(id, cb) {
  var feedUrl = allFeeds[id].url,
      feedName = allFeeds[id].name;
  $.ajax({
    type: "POST",
    url: 'https://rsstojson.udacity.com/parseFeed',
    data: JSON.stringify({
      url: feedUrl
    }),
    contentType: "application/json",
    success: function success(result, status) {
      var container = $('.feed'),
          title = $('.header-title'),
          entries = result.feed.entries,
          entriesLen = entries.length,
          entryTemplate = Handlebars.compile($('.tpl-entry').html());
      title.html(feedName); // Set the header text

      container.empty(); // Empty out all previous entries

      /* Loop through the entries we just loaded via the Google
       * Feed Reader API. We'll then parse that entry against the
       * entryTemplate (created above using Handlebars) and append
       * the resulting HTML to the list of entries on the page.
       */

      entries.forEach(function (entry) {
        container.append(entryTemplate(entry));
      });

      if (cb) {
        cb();
      }
    },
    error: function error(result, status, err) {
      //run only the callback without attempting to parse result due to error
      if (cb) {
        cb();
      }
    },
    dataType: "json"
  });
}
/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */


google.setOnLoadCallback(init);
/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */

$(function () {
  var container = $('.feed'),
      feedList = $('.feed-list'),
      feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
      feedId = 0,
      menuIcon = $('.menu-icon-link');
  /* Loop through all of our feeds, assigning an id property to
   * each of the feeds based upon its index within the array.
   * Then parse that feed against the feedItemTemplate (created
   * above using Handlebars) and append it to the list of all
   * available feeds within the menu.
   */

  allFeeds.forEach(function (feed) {
    feed.id = feedId;
    feedList.append(feedItemTemplate(feed));
    feedId++;
  });
  /* When a link in our feedList is clicked on, we want to hide
   * the menu, load the feed, and prevent the default action
   * (following the link) from occurring.
   */

  feedList.on('click', 'a', function () {
    var item = $(this);
    $('body').addClass('menu-hidden');
    loadFeed(item.data('id'));
    return false;
  });
  /* When the menu icon is clicked on, we need to toggle a class
   * on the body to perform the hiding/showing of our menu.
   */

  menuIcon.on('click', function () {
    $('body').toggleClass('menu-hidden');
  });
}());
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhbGxGZWVkcyIsIm5hbWUiLCJ1cmwiLCJpbml0IiwibG9hZEZlZWQiLCJpZCIsImNiIiwiZmVlZFVybCIsImZlZWROYW1lIiwiJCIsImFqYXgiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJzdGF0dXMiLCJjb250YWluZXIiLCJ0aXRsZSIsImVudHJpZXMiLCJmZWVkIiwiZW50cmllc0xlbiIsImxlbmd0aCIsImVudHJ5VGVtcGxhdGUiLCJIYW5kbGViYXJzIiwiY29tcGlsZSIsImh0bWwiLCJlbXB0eSIsImZvckVhY2giLCJlbnRyeSIsImFwcGVuZCIsImVycm9yIiwiZXJyIiwiZGF0YVR5cGUiLCJnb29nbGUiLCJzZXRPbkxvYWRDYWxsYmFjayIsImZlZWRMaXN0IiwiZmVlZEl0ZW1UZW1wbGF0ZSIsImZlZWRJZCIsIm1lbnVJY29uIiwib24iLCJpdGVtIiwiYWRkQ2xhc3MiLCJ0b2dnbGVDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQVFBO0FBQ0EsSUFBSUEsUUFBUSxHQUFHLENBQ1g7QUFDSUMsRUFBQUEsSUFBSSxFQUFFLGNBRFY7QUFFSUMsRUFBQUEsR0FBRyxFQUFFO0FBRlQsQ0FEVyxFQUlSO0FBQ0NELEVBQUFBLElBQUksRUFBRSxZQURQO0FBRUNDLEVBQUFBLEdBQUcsRUFBRTtBQUZOLENBSlEsRUFPUjtBQUNDRCxFQUFBQSxJQUFJLEVBQUUsYUFEUDtBQUVDQyxFQUFBQSxHQUFHLEVBQUU7QUFGTixDQVBRLEVBVVI7QUFDQ0QsRUFBQUEsSUFBSSxFQUFFLG9CQURQO0FBRUNDLEVBQUFBLEdBQUcsRUFBRTtBQUZOLENBVlEsQ0FBZjtBQWdCQTs7Ozs7QUFJQSxTQUFTQyxJQUFULEdBQWdCO0FBQ1o7QUFDQUMsRUFBQUEsUUFBUSxDQUFDLENBQUQsQ0FBUjtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7QUFRQyxTQUFTQSxRQUFU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QUFuQjtBQUNBeEMsSUFBQUEsUUFBUSxDQUFDdUMsSUFBSSxDQUFDL0IsSUFBTCxDQUFVLElBQVYsQ0FBRCxDQUFSO0FBQ0EsV0FBTyxLQUFQO0FBQ0gsR0FORDtBQVFBOzs7O0FBR0E2QixFQUFBQSxRQUFRLENBQUNDLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFlBQVc7QUFDNUJqQyxJQUFBQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVVvQyxXQUFWLENBQXNCLGFBQXRCO0FBQ0gsR0FGRDtBQUdILENBdENDLEVBQUQsQ0FBRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBhcHAuanNcbiAqXG4gKiBUaGlzIGlzIG91ciBSU1MgZmVlZCByZWFkZXIgYXBwbGljYXRpb24uIEl0IHVzZXMgdGhlIEdvb2dsZVxuICogRmVlZCBSZWFkZXIgQVBJIHRvIGdyYWIgUlNTIGZlZWRzIGFzIEpTT04gb2JqZWN0IHdlIGNhbiBtYWtlXG4gKiB1c2Ugb2YuIEl0IGFsc28gdXNlcyB0aGUgSGFuZGxlYmFycyB0ZW1wbGF0aW5nIGxpYnJhcnkgYW5kXG4gKiBqUXVlcnkuXG4gKi9cblxuLy8gVGhlIG5hbWVzIGFuZCBVUkxzIHRvIGFsbCBvZiB0aGUgZmVlZHMgd2UnZCBsaWtlIGF2YWlsYWJsZS5cbnZhciBhbGxGZWVkcyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdVZGFjaXR5IEJsb2cnLFxuICAgICAgICB1cmw6ICdodHRwOi8vYmxvZy51ZGFjaXR5LmNvbS9mZWVkJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ0NTUyBUcmlja3MnLFxuICAgICAgICB1cmw6ICdodHRwOi8vZmVlZHMuZmVlZGJ1cm5lci5jb20vQ3NzVHJpY2tzJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ0hUTUw1IFJvY2tzJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL2ZlZWRzLmZlZWRidXJuZXIuY29tL2h0bWw1cm9ja3MnXG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnTGluZWFyIERpZ3Jlc3Npb25zJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL2ZlZWRzLmZlZWRidXJuZXIuY29tL3VkYWNpdHktbGluZWFyLWRpZ3Jlc3Npb25zJ1xuICAgIH1cbl07XG5cbi8qIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHVwIG91ciBhcHBsaWNhdGlvbi4gVGhlIEdvb2dsZSBGZWVkXG4gKiBSZWFkZXIgQVBJIGlzIGxvYWRlZCBhc3luY2hvbm91c2x5IGFuZCB3aWxsIHRoZW4gY2FsbCB0aGlzXG4gKiBmdW5jdGlvbiB3aGVuIHRoZSBBUEkgaXMgbG9hZGVkLlxuICovXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIC8vIExvYWQgdGhlIGZpcnN0IGZlZWQgd2UndmUgZGVmaW5lZCAoaW5kZXggb2YgMCkuXG4gICAgbG9hZEZlZWQoMCk7XG59XG5cbi8qIFRoaXMgZnVuY3Rpb24gcGVyZm9ybXMgZXZlcnl0aGluZyBuZWNlc3NhcnkgdG8gbG9hZCBhXG4gKiBmZWVkIHVzaW5nIHRoZSBHb29nbGUgRmVlZCBSZWFkZXIgQVBJLiBJdCB3aWxsIHRoZW5cbiAqIHBlcmZvcm0gYWxsIG9mIHRoZSBET00gb3BlcmF0aW9ucyByZXF1aXJlZCB0byBkaXNwbGF5XG4gKiBmZWVkIGVudHJpZXMgb24gdGhlIHBhZ2UuIEZlZWRzIGFyZSByZWZlcmVuY2VkIGJ5IHRoZWlyXG4gKiBpbmRleCBwb3NpdGlvbiB3aXRoaW4gdGhlIGFsbEZlZWRzIGFycmF5LlxuICogVGhpcyBmdW5jdGlvbiBhbGwgc3VwcG9ydHMgYSBjYWxsYmFjayBhcyB0aGUgc2Vjb25kIHBhcmFtZXRlclxuICogd2hpY2ggd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgZXZlcnl0aGluZyBoYXMgcnVuIHN1Y2Nlc3NmdWxseS5cbiAqL1xuIGZ1bmN0aW9uIGxvYWRGZWVkKGlkLCBjYikge1xuICAgICB2YXIgZmVlZFVybCA9IGFsbEZlZWRzW2lkXS51cmwsXG4gICAgICAgICBmZWVkTmFtZSA9IGFsbEZlZWRzW2lkXS5uYW1lO1xuXG4gICAgICQuYWpheCh7XG4gICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgdXJsOiAnaHR0cHM6Ly9yc3N0b2pzb24udWRhY2l0eS5jb20vcGFyc2VGZWVkJyxcbiAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXJsOiBmZWVkVXJsfSksXG4gICAgICAgY29udGVudFR5cGU6XCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCwgc3RhdHVzKXtcblxuICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLmZlZWQnKSxcbiAgICAgICAgICAgICAgICAgICAgIHRpdGxlID0gJCgnLmhlYWRlci10aXRsZScpLFxuICAgICAgICAgICAgICAgICAgICAgZW50cmllcyA9IHJlc3VsdC5mZWVkLmVudHJpZXMsXG4gICAgICAgICAgICAgICAgICAgICBlbnRyaWVzTGVuID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICBlbnRyeVRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKCQoJy50cGwtZW50cnknKS5odG1sKCkpO1xuXG4gICAgICAgICAgICAgICAgIHRpdGxlLmh0bWwoZmVlZE5hbWUpOyAgIC8vIFNldCB0aGUgaGVhZGVyIHRleHRcbiAgICAgICAgICAgICAgICAgY29udGFpbmVyLmVtcHR5KCk7ICAgICAgLy8gRW1wdHkgb3V0IGFsbCBwcmV2aW91cyBlbnRyaWVzXG5cbiAgICAgICAgICAgICAgICAgLyogTG9vcCB0aHJvdWdoIHRoZSBlbnRyaWVzIHdlIGp1c3QgbG9hZGVkIHZpYSB0aGUgR29vZ2xlXG4gICAgICAgICAgICAgICAgICAqIEZlZWQgUmVhZGVyIEFQSS4gV2UnbGwgdGhlbiBwYXJzZSB0aGF0IGVudHJ5IGFnYWluc3QgdGhlXG4gICAgICAgICAgICAgICAgICAqIGVudHJ5VGVtcGxhdGUgKGNyZWF0ZWQgYWJvdmUgdXNpbmcgSGFuZGxlYmFycykgYW5kIGFwcGVuZFxuICAgICAgICAgICAgICAgICAgKiB0aGUgcmVzdWx0aW5nIEhUTUwgdG8gdGhlIGxpc3Qgb2YgZW50cmllcyBvbiB0aGUgcGFnZS5cbiAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChlbnRyeVRlbXBsYXRlKGVudHJ5KSk7XG4gICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICBlcnJvcjogZnVuY3Rpb24gKHJlc3VsdCwgc3RhdHVzLCBlcnIpe1xuICAgICAgICAgICAgICAgICAvL3J1biBvbmx5IHRoZSBjYWxsYmFjayB3aXRob3V0IGF0dGVtcHRpbmcgdG8gcGFyc2UgcmVzdWx0IGR1ZSB0byBlcnJvclxuICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgZGF0YVR5cGU6IFwianNvblwiXG4gICAgIH0pO1xuIH1cblxuLyogR29vZ2xlIEFQSTogTG9hZHMgdGhlIEZlZWQgUmVhZGVyIEFQSSBhbmQgZGVmaW5lcyB3aGF0IGZ1bmN0aW9uXG4gKiB0byBjYWxsIHdoZW4gdGhlIEZlZWQgUmVhZGVyIEFQSSBpcyBkb25lIGxvYWRpbmcuXG4gKi9cbmdvb2dsZS5zZXRPbkxvYWRDYWxsYmFjayhpbml0KTtcblxuLyogQWxsIG9mIHRoaXMgZnVuY3Rpb25hbGl0eSBpcyBoZWF2aWx5IHJlbGlhbnQgdXBvbiB0aGUgRE9NLCBzbyB3ZVxuICogcGxhY2Ugb3VyIGNvZGUgaW4gdGhlICQoKSBmdW5jdGlvbiB0byBlbnN1cmUgaXQgZG9lc24ndCBleGVjdXRlXG4gKiB1bnRpbCB0aGUgRE9NIGlzIHJlYWR5LlxuICovXG4kKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250YWluZXIgPSAkKCcuZmVlZCcpLFxuICAgICAgICBmZWVkTGlzdCA9ICQoJy5mZWVkLWxpc3QnKSxcbiAgICAgICAgZmVlZEl0ZW1UZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZSgkKCcudHBsLWZlZWQtbGlzdC1pdGVtJykuaHRtbCgpKSxcbiAgICAgICAgZmVlZElkID0gMCxcbiAgICAgICAgbWVudUljb24gPSAkKCcubWVudS1pY29uLWxpbmsnKTtcblxuICAgIC8qIExvb3AgdGhyb3VnaCBhbGwgb2Ygb3VyIGZlZWRzLCBhc3NpZ25pbmcgYW4gaWQgcHJvcGVydHkgdG9cbiAgICAgKiBlYWNoIG9mIHRoZSBmZWVkcyBiYXNlZCB1cG9uIGl0cyBpbmRleCB3aXRoaW4gdGhlIGFycmF5LlxuICAgICAqIFRoZW4gcGFyc2UgdGhhdCBmZWVkIGFnYWluc3QgdGhlIGZlZWRJdGVtVGVtcGxhdGUgKGNyZWF0ZWRcbiAgICAgKiBhYm92ZSB1c2luZyBIYW5kbGViYXJzKSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBsaXN0IG9mIGFsbFxuICAgICAqIGF2YWlsYWJsZSBmZWVkcyB3aXRoaW4gdGhlIG1lbnUuXG4gICAgICovXG4gICAgYWxsRmVlZHMuZm9yRWFjaChmdW5jdGlvbihmZWVkKSB7XG4gICAgICAgIGZlZWQuaWQgPSBmZWVkSWQ7XG4gICAgICAgIGZlZWRMaXN0LmFwcGVuZChmZWVkSXRlbVRlbXBsYXRlKGZlZWQpKTtcblxuICAgICAgICBmZWVkSWQrKztcbiAgICB9KTtcblxuICAgIC8qIFdoZW4gYSBsaW5rIGluIG91ciBmZWVkTGlzdCBpcyBjbGlja2VkIG9uLCB3ZSB3YW50IHRvIGhpZGVcbiAgICAgKiB0aGUgbWVudSwgbG9hZCB0aGUgZmVlZCwgYW5kIHByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uXG4gICAgICogKGZvbGxvd2luZyB0aGUgbGluaykgZnJvbSBvY2N1cnJpbmcuXG4gICAgICovXG4gICAgZmVlZExpc3Qub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpO1xuXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbWVudS1oaWRkZW4nKTtcbiAgICAgICAgbG9hZEZlZWQoaXRlbS5kYXRhKCdpZCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyogV2hlbiB0aGUgbWVudSBpY29uIGlzIGNsaWNrZWQgb24sIHdlIG5lZWQgdG8gdG9nZ2xlIGEgY2xhc3NcbiAgICAgKiBvbiB0aGUgYm9keSB0byBwZXJmb3JtIHRoZSBoaWRpbmcvc2hvd2luZyBvZiBvdXIgbWVudS5cbiAgICAgKi9cbiAgICBtZW51SWNvbi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtZW51LWhpZGRlbicpO1xuICAgIH0pO1xufSgpKTtcbiJdfQ==
