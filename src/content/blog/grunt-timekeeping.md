---
title: "Grunt Timekeeping"
posted: 2014-10-31
tags: ["development", "workflow", "grunt"]
blog: true
---

Recently I plugged in a Grunt plugin that handily displays a summary of the time taken by a project's Grunt build tasks. Before this the team had only been aware of the overall time taken. Especially with LiveReload running, waiting for the page to reload with our changes.

We suspected the Compass compilation was taking "a long time". But we didn't know for certain how long and if that was the only problem area. With [time-grunt](https://github.com/sindresorhus/time-grunt) we could now see a nice breakdown of each task's time taken allowing us to know what to focus our performance improvements on.

Setting it up was easy enough. Though it is slightly different from the usual Grunt tasks. Just install it using NPM and save it into the project's `package.json` as a development dependency with `npm install time-grunt --save-dev` in the project's front end root directory. Then in your project's `Gruntfile.js` add `time-grunt` as a required module and pass it the Grunt instance with `require("time-grunt")(grunt);`

[![time-grunt task output](assets/img/blog/screenshot-time-grunt.png)]({{assets}}/img/blog/screenshot-time-grunt.png)

Now when you run Grunt again, at the end of your Grunt output there will be a nice time chart broken down by tasks reporting how long each task took with a total run time also. Sweet!