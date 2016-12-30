---
layout: post
title:  Protractor Control Flow
date:   2016-12-28
abstract: Manipulating the control flow through the use of implicit waits
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
The proper way to manipulate the control flow is through implicit waits.  An **implicit wait** is simply a way of blocking test flow until a condition is met.  An **explicit wait** blocks test execution for a fixed amount of time, not based on any condition.  Explicit waits in Protractor are invoked via `browser.sleep()`.  *In general, explicit waits are not a good testing practice and unfortunately I see people use them frequently.*  The most common reason I hear people say they used an explicit wait is because they are either getting `StaleElementReference` or `NoSuchElement` errors.  For example, when trying to test a recently created object:
{% highlight javascript %}
$('button.createPost').click(); // creates a new post
$('.newPostTitle').getText().then(function(text) {
  console.log(text); // error NoSuchElement
});
{% endhighlight %}

The **explicit wait** solution to that would be to insert a `browser.sleep(5000)` (time in milliseconds) between the `click()` and `getText()` events.  The downside to this is that now the test will *always* wait 5 seconds before accessing the new post, regardless of how long it took the post to create and show on the UI.  While this solution works in most cases, it is not a good practice and as your run time will drastically increase as you continue adding more tests.  The **implicit wait** is a much more efficient and flexible solution.
