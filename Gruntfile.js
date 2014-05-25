/*
 * Copyright 2014 David Herges <david@spektrakel.de>
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg:    grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').vendor,
    page:   grunt.file.readJSON('page.json'),

    connect: {
      dev: {
        options: {
          hostname: 'localhost',
          port: 8000,
          base: '<%= page.web %>',
          keepalive: true,
          open: {
            appName: '/Applications/Google Chrome.app'
          }
        }
      }
    },

    assemble: {
      options: {
        flatten: true,

        // page template, layouts, partials
        layout: '<%= page.layout %>',
        layoutdir: '<%= page.layoutdir %>',
        partials: '<%= page.partials %>',
        helpers: '<%= page.helpers %>',

        // data
        data: 'package.json',

        // collections
        collections: [{
          name: 'quadblog',
          sortby: 'posted',
          sortorder: 'descending'
        }]
      },
      pages: {
        files: [{
          cwd: '<%= page.content %>/_pages',
          dest: '<%= page.web %>',
          expand: true,
          src: '**/*.hbs'
        }, {
          cwd: '<%= page.content %>/quadblog',
          dest: '<%= page.web %>/quadblog',
          expand: true,
          src: ['**/*.hbs', '**/*.md']
        }]
      }
    },

    less: {
      development: {
        options: {
          sourceMap: true,
          dumpLineNumbers: true
        },
        files: {'<%= page.web %>/assets/css/styles.css': 'less/styles.less'}
      },
      production: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {'<%= page.web %>/assets/css/styles.css': 'styles/styles.less'}
      }
    },

    copy: {
      dist: {
        files: [{
          cwd: '<%= page.src %>',
          expand: true,
          src: 'assets/**/*',
          dest: '<%= page.web %>'
        }]
      }
    },

    clean: {
      dist: {
        files: [{
          cwd: '<%= page.web %>',
          expand: true,
          src: ['**/*', '!vendor/**']
        }]
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('assemble');

  // Default tasks to be run.
  grunt.registerTask('default', ['clean', 'copy', 'less:production', 'assemble', 'connect']);
};
