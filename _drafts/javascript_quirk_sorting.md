---
layout: post
title:  JavaScript Quirk - Sorting
date:   2016-02-26
abstract: Hmm
categories: javascript
permalink: /blog/javascript-quirk-sorting
---
Most programming languages have some quirks about them, whether it's their syntax or how they handle primitive types.  This can lead to some frustrating bugs in your code if you unknowingly mishandle data.  To avoid any pitfalls, it's always good to know how things really work under the hood.  One of JavaScripts quirks is the `sort()` function.

In my experience, it's very common for a coding interview to include "gotcha" type of questions.  All they're looking for is how well do you really know the language.  Consider the following example, what is the result of this codex?
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

That will give you numbers in ascending order.  If you want them in descending order, you can just flip the operator `<` to `>` or call `reverse()` on the returned array.  And remember, since we used the compare function as the argument, each element is treated as a **number** and not a **string**.  
