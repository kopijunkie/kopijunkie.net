---
title: "Using rsync to deploy to HostGator"
posted: 2015-01-26
tags: ["development", "workflow", "deployment"]
blog: true
---

Deploying my generated site to my HostGator shared server now is just a matter of using `rsync` in Terminal to sync my local repository’s dist directory contents to the remote server’s public_html directory. Something like this:

  rsync -avz --progress --partial -e 'ssh -p 2222' ~/path/to/dist username@domain.name:/path/to/public_html/

Here’s an [explanation](http://explainshell.com/explain?cmd=rsync+-avz+--progress+--partial+-e) of the `rsync` command.

For quite a while, my personal site deployment process was still old school file transfers over FTP despite using continuous integration tools like Hudson and Jenkins at work. I eventually got around to setting up a PHP web hook when the site’s code base was kept on BitBucket. This was great when my entire repository basically was all the HTML, CSS, JavaScript files needed for the site.

With my site morphing from a dynamic site with very static content to a pretty much static site with some PHP, setting up PHP web hooks on the Github repo wasn’t quite suitable for me this time. I only need the generated files that my Gruntfile’s assemble task puts in the dist directory every time Grunt runs.

With `rsync`, since I can change what goes where on the fly whenever I need to do a deploy, I could have a subdomain called test.kopijunkie.net that points to a test subdirectory which has a version of my site with new features from another branch of my site’s Github repository. Handy for testing things out stuff in the production environment before being deploying to the actual site.
