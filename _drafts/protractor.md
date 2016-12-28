---
layout: post
title:  "Protractor Testing: Controlling the Flow"
date:   2016-12-28
categories: protractor javascript
permalink: /blog/protractor/elements
---
Recently, end-to-end testing has been gaining popularity in the workplace as a form of testing.  At my last two jobs, our tool of choice was <a href="http://www.protractortest.org/#/" target="blank_">Protractor</a>, an E2E framework wrapped around Selenium Webdriver.  Protractor is managed by a team at Google, so naturally it works well with apps made in AngularJS.  However, with a few tweaks it can also be made to work with non-Angular apps.

The only advantage of testing AngularJS apps is that Protractor has the ability to synchronize with Angulars $scope.  This means that Protractor knows when there are any outstanding calls
