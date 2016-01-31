---
title: "Autumn 2014 Update"
posted: 2014-10-25
tags: [ "development", "workflow", "browserstack", "design", "git", "kdiff3", "livereload", "photoshop", "sketch", "sublime text" ]
blog: true
---

So for the past couple of weeks I have been busy doing some rather major refactoring work on KopiJunkie.net’s code.

I’m bringing my front end workflow up to date with modern front end development. I have to admit I don’t work with PHP much. In fact, the back end language I work with the most in general is Java. With some SQL (specifically, I work daily with MySQL databases). Actually, I’m not sure why I mentioned that as I will still be keeping some of the PHP functionality in the end (change of plans on this last point now - **see update**).

Anyway, what is really happening is I am getting the site to not be dependent on PHP for the site’s content generation, i.e. the front end. In its place I’m going to be using a static site generator (namely [Assemble](http://assemble.io/)) to generate the static HTML pages. There’s a fair bit more work that’s also happening with JavaScript.

But for now, while the work’s still in progress and I’m developing in the open with the code on GitHub, feel free to have a peek at what’s happening at [the repo](https://github.com/kopijunkie/kopijunkie.net).

**UPDATE (31 Jan 2016)**: I've recently discovered static site hosting service [Netlify](https://www.netlify.com/) and looking the features they offer plus my (positive) initial impressions of it, it looks like I might be able to shed the 1 lingering PHP dependency.
