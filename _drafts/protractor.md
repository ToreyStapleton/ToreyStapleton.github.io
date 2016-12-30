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
element(by.model('search')).sendKeys('vacation in aruba');
element(by.css('button.search')).click();
element(by.css('div.pageTitle')).getText().then(function(title) {
  console.log(title); // 'Search results for vacation in aruba'
})
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
})
{% endhighlight %}


One of the main advantages of testing Angular apps is that Protractor has the ability to synchronize with the `angular` object, allowing Protractor to know when the app when the app is completely ready.  However, in some cases this is not always reliable, so you need some other ways to manipulate the control flow.


<h3>Implicit Waits</h3>
