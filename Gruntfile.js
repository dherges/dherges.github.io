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
          port: 8000,
          base: '<%= page.dest %>',
          keepalive: true,
          open: true
        }
      }
    },

    assemble: {
      options: {
        flatten: true,

        // page template, layouts, partials
        layout: '<%= page.layout %>',
        layoutdir: '<%= page.src %>/<%= page.layoutdir %>',
        partials: '<%= page.src %>/<%= page.partials %>',
        helpers: '<%= page.src %>/<%= page.helpers %>',

        // collections
        collections: [{
          name: 'post',
          sortby: 'posted',
          sortorder: 'descending'
        }]
      },
      posts: {
        files: [{
          cwd: '<%= page.src %>/<%= page.content %>',
          dest: '<%= page.dest %>',
          expand: true,
          src: ['**/*.hbs', '**/*.md', '!_pages/**/*']
        }, {
          cwd: '<%= page.src %>/<%= page.content %>/_pages/',
          dest: '<%= page.dest %>',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    less: {
      development: {
        options: {
          sourceMap: true,
          dumpLineNumbers: true
        },
        files: {'<%= page.dest %>/assets/css/styles.css': '<%= page.src %>/less/styles.less'}
      },
      production: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {'<%= page.dest %>/assets/css/styles.css': '<%= page.src %>/less/styles.less'}
      }
    },

    copy: {
      dist: {
        files: [{
          cwd: '<%= page.src %>',
          expand: true,
          src: 'assets/**/*',
          dest: '<%= page.dest %>'
        }]
      }
    },

    clean: {
      dist: {
        files: [{
          cwd: '<%= page.dest %>',
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
