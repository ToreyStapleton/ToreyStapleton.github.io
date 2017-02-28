---
layout: post
title:  JavaScript Quirk - Sorting
date:   2017-01-16
abstract: Digging into the JavaScript sort function and why it can sometimes lead to surprising or unexpected results
categories: javascript
permalink: /blog/javascript-quirk-sorting
---
Most programming languages have some quirks about them, whether it's their syntax or how they handle primitive types.  This can lead to some frustrating bugs in your code if you unknowingly mishandle data.  To avoid any pitfalls, it's always good to know how things really work under the hood.  One of JavaScripts quirks is the `sort()` function.  Consider the following example, what is the result of this code?
{% highlight javascript %}
var numbers = [1, 2, 22, 10, 8, 70];
numbers.sort();
{% endhighlight %}

If you were answering this question in a language like Python or Ruby it would return the numbers in increasing order, `[1, 2, 8, 10, 22, 70]`, which is the expected result.  However, if you did this in JavaScript, you would get `[1, 10, 2, 22, 70, 8]`.  Wait a second... `10` before `2` and `70` before `8`?  What's going on here?  JavaScripts `sort()` takes one function as an optional argument.  If omitted, the default `sort()` function compares the **string** *value of each element* and returns a sorted array based on Unicode value.  Now the result makes more sense because `"70"` comes before `"8"` in Unicode.  So, providing the optional argument is your way of working around this.  

For numbers it's very simple:
{% highlight javascript %}
var numbers = [1, 2, 22, 10, 8, 73];
numbers.sort(function(a, b) {
  return a < b
});
{% endhighlight %}

That will give you numbers in ascending order.  If you want them in descending order, you can just flip the operator `<` to `>` or call `reverse()` on the returned array.  And remember, since we used the compare function as the argument, each element is treated as a **number** and not a **string**.  Handling arrays of strings will be a little different.  In Unicode, capital letters come before lower case letters.

{% highlight javascript %}
var words = ["banana", "cherry", "Orange"];
words.sort();
---> ["Orange", "banana", "cherry"]
{% endhighlight %}

If you want to alphabetically order, you'll use another compare function with some conditional operators.  You'll also want to either change everything to upper or lowercase for case insensitivity.

{% highlight javascript %}
var words = ["banana", "cherry", "Orange"];
words.sort(function(a, b) {
    var x = a.toLowerCase(),
        y = b.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
});
---> ["banana", "cherry", "Orange"]
{% endhighlight %}

There is also the `localeCompare()` method, that we could use:

{% highlight javascript %}
words.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});
{% endhighlight %}

But this is significantly slower than the three comparisons we used in our previous example.  In fact, according to [jsperf](https://jsperf.com/js-word-sorting) the `toLocale()` function is about 72% slower.  

In my experience, it's very common for a coding interview to include these "gotcha" type of questions.  All they're looking for is your attention to detail how well do you really know the language.  Learning the intricacies of your language of choice and you will be much better off.
