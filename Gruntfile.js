/*
 * Generated on 2014-10-11
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

"use strict";

// # Globbing
// for performance reasons we're only matching one level down:
// "<%= config.src %>/templates/pages/{,*/}*.hbs"
// use this if you want to match all subfolders:
// "<%= config.src %>/templates/pages/**/*.hbs"

module.exports = function(grunt) {

  require("time-grunt")(grunt); // Grunt task times

  grunt.initConfig({

    config: {
      src: "src",
      dist: "dist"
    },

    bower: {
      install: {
        options: {
          targetDir: "dist/assets/libs",
          install: false,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= config.src %>/images",
          src: [ "**/*.{png,jpg,gif}" ],
          dest: "<%= config.dist %>/assets/img"
        }]
      }
    },

    sass: {
      dist: {
        options: {
          style: "expanded",
          lineNumbers: true,
          loadPath: require("node-neat").includePaths,
          update: true
        },
        files: [{
          expand: true,
          cwd: "<%= config.src %>/scss",
          src: [ "main.scss" ],
          dest: "<%= config.dist %>/assets/css",
          ext: ".css"
        }]
      }
    },

    jshint: {
      files: [ "Gruntfile.js", "src/js/*.js", "!src/js/last.fm.records.js" ],
      options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: "<%= config.src %>/js",
        src: "**",
        dest: "<%= config.dist %>/assets/js",
        flatten: true,
        filter: "isFile",
      },
      php: {
        expand: true,
        cwd: "<%= config.src %>/php",
        src: "**",
        dest: "<%= config.dist %>/assets/php",
        flatten: true,
        filter: "isFile",
      }
    },

    useminPrepare: {
      html: "<%= config.dist %>/*.html"
    },
    usemin: {
      html: "<%= config.dist %>/*.html"
    },

    watch: {
      jshint: {
        files: [ "<%= config.src %>/js/**/*.js"],
        tasks: [ "jshint", "copy" ]
      },
      sass: {
        files: [ "<%= config.src %>/scss/**/*.scss" ],
        tasks: [ "sass", "newer:imagemin" ]
      },
      assemble: {
        files: [ "<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}" ],
        tasks: [ "assemble" ]
      },
      imagemin: {
        files: [ "<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}" ],
        tasks: [ "newer:imagemin" ]
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>"
        },
        files: [
          "<%= config.src %>/js/{,*/}*.js",
          "<%= config.dist %>/{,*/}*.html",
          "<%= config.dist %>/assets/{,*/}*.css",
          "<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to "0.0.0.0" to access the server from outside
        hostname: "local.kopijunkie.dev"
      },
      livereload: {
        options: {
          open: true,
          base: [ "<%= config.dist %>" ]
        }
      }
    },

    assemble: {
      options: {
        collections: [{
          name: "blog",
          inflection: "post",
          sortby: "posted",
          sortorder: "descending"
        }],
        flatten: true,
        assets: "<%= config.dist %>/assets",
        layout: "<%= config.src %>/templates/layouts/default.hbs",
        partials: "<%= config.src %>/templates/partials/*.hbs",
        data: "<%= config.src %>/data/*.{json,yml}",
        plugins: [ "assemble-contrib-permalinks", "assemble-contrib-sitemap" ]
      },
      pages: {
        files: [{
          "<%= config.dist %>/": [ "<%= config.src %>/content/pages/*.hbs" ]
        },{
          "<%= config.dist %>/": [ "<%= config.src %>/content/blog/*.md" ]
        }]
      }
    },

    // Before generating any new files, remove any previously created files.
    clean: [
      "<%= config.dist %>/**/*.{html,xml}",
      "<%= config.dist %>/assets/js/*.js"
    ]

  });

  // Autoload grunt tasks, including "assemble" task.
  require("load-grunt-tasks")(grunt, { pattern: [ "grunt-*", "assemble" ] });

  grunt.registerTask("stage", [
    "bower",
    "newer:imagemin",
    "jshint",
    "sass",
    "clean",
    "copy",
    "assemble",
    "connect:livereload",
    "watch"
  ]);

  grunt.registerTask("build", [
    "bower",
    "newer:imagemin",
    "jshint",
    "sass",
    "clean",
    "copy",
    "assemble",
    "useminPrepare",
    "concat",
    "uglify",
    "cssmin",
    "usemin"
  ]);

  grunt.registerTask("default", [ "build" ]);

};
