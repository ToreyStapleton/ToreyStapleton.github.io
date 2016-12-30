---
layout: post
title:  Protractor Control Flow
date:   2016-12-28
abstract: Improving test consistency and run time by manipulating the control flow with implicit waits
categories: protractor javascript
permalink: /blog/protractor/elements
---
Recently, end-to-end testing has been gaining popularity as a valid way of testing.  At my last two jobs, our tool of choice was <a href="http://www.protractortest.org/#/" target="blank_">Protractor</a>, an open source E2E framework wrapped around Selenium Webdriver.  Protractor is managed by a team at Google, so naturally it works well with apps made in AngularJS.  Don't worry if your app isn't made with Angular, with a few tweaks Protractor can also be made to work with non-Angular apps.

Protractor is asynchronous in nature, all functions return a `promise`.  Protractor uses a `control flow` to maintain a queue of pending promises that keeps webdriver actions and test execution organized.  It allows us to write code like this:

{% highlight javascript %}
browser.get('www.google.com');
element(by.css('input.search')).sendKeys('vacation in aruba');
element(by.css('button.search')).click();
element(by.css('div.pageTitle')).getText().then(function(title) {
  console.log(title); // 'Search results for vacation in aruba'
});
{% endhighlight %}

That really executes like this:
{% highlight javascript %}
browser.get('www.google.com').then(function() {
  return element(by.model('search')).sendKeys('vacation in aruba');
}).then(function() {
  return element(by.css('button.search')).click();
}).then(function() {
  return element(by.css('div.pageTitle')).getText();
}).then(function(title) {
  console.log(title); // 'Search results for vacation in aruba'
});
{% endhighlight %}


One of the main advantages of testing Angular apps is that Protractor has the ability to synchronize with the `angular` object, allowing Protractor to know when the app when the app is completely ready.  However, in some cases this is not always reliable, so you need some other ways to manipulate the control flow.


<h3>Explicit vs Implicit Waits</h3>
The proper way to manipulate the control flow is through implicit waits.  An **implicit wait** is simply a way of blocking test flow until a condition is met.  An **explicit wait** blocks test execution for a fixed amount of time, not based on any condition.  *In general, explicit waits are not a good testing practice and unfortunately I see people use them frequently.*  Explicit waits in Protractor are invoked via `browser.sleep()`.  The most common reason I hear people say they used an explicit wait is because they are either getting `StaleElementReference` or `NoSuchElement` errors.  For example, when trying to test a recently created object, you may get an error if the test executes before the app has finished updating:
{% highlight javascript %}
$('button.createPost').click(); // creates a new post
// server takes longer to respond than usual
$('.newPostTitle').getText().then(function(text) {
  console.log(text); // could get error NoSuchElement
});
{% endhighlight %}

The **explicit wait** solution to that would be to insert a `browser.sleep(5000)` (time in milliseconds) between the `click()` and `getText()` events.  The downside to this is that now the test will *always* wait 5 seconds before accessing the new post, regardless of how long it took the post to create and update on the UI.  While this solution works in most cases, it is not a good practice as your run time will drastically increase as you continue adding more tests.  The **implicit wait** is a much more efficient and flexible solution:

{% highlight javascript %}
$('button.createPost').click(); // creates a new post
// wait for that item to be added to the DOM
browser.wait(EC.presenceOf($('.newPostTitle')));
$('.newPostTitle').getText().then(function(text) {
  console.log(text);
});
{% endhighlight %}

The function `browser.wait()` pauses the test until the given promise `presenceOf()` returns `true`, which only occurs when the DOM is updated with that element.  The only error outcome you could encounter is if the test exceeds the timeout limit specified in your config file.  This is an example of Protractor's <a href="http://www.protractortest.org/#/api?view=ProtractorExpectedConditions">Expected Conditions</a>.  I find `presenceOf()` and its counterpart `stalenessOf()` to be the most common ones, some other useful ones are `elementToBeClickable()` and `textToBePresentInElement`.  You can also combine these conditions together with `and`, `or`, and/or `not`.  These are much more flexible than the **explicit wait** because it reduces the chance of encountering random errors and it will halt test execution for the exact time needed, whether that is 0.1 seconds or 10 seconds (which also makes the test more stable).

You can get creative with `browser.wait()` and create your own Expected Conditions by using some other Protractor functions.  For example, to wait for an attribute to be added to an element:

{% highlight javascript %}
function waitForAttributePresent(el, attr, attrValue, time) {
  var timeout = time || 0;
  return browser.wait(function() {
    return el.getAttribute(attr).then(function(val) {
      return ~val.indexOf(attrValue) < 0;
    });
  });
};
// example: wait for an elements class to contain 'ng-hide'
var myPost = $('div.post');
waitForAttributePresent(myPost, 'class', 'ng-hide', 5000);
{% endhighlight %}

Properly using **implicit waits** should effectively improve your test consistency and run time.  Learning them will make your life much easier.
