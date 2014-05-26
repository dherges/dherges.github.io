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

    clean: {
      dist: {
        files: [{
          cwd: '<%= page.web %>',
          expand: true,
          src: ['**/*', '!vendor/**']
        }]
      }
    },

    copy: {
      assets: {
        files: [{
          cwd: '',
          expand: true,
          src: 'assets/**/*',
          dest: '<%= page.web %>'
        }]
      },
      content: {
        files: [{
          cwd: 'content',
          expand: true,
          src: '**/*.jpg',
          dest: '<%= page.web %>'
        }]
      }
    },

    less: {
      development: {
        options: {
          sourceMap: true,
          dumpLineNumbers: true
        },
        files: {'<%= page.web %>/assets/css/styles.css': 'styles/styles.less'}
      },
      production: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {'<%= page.web %>/assets/css/styles.min.css': 'styles/styles.less'}
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

        // plugins
        plugins: ['assemble-related-pages'],

      },
      pages: {
        files: [{
          cwd: '<%= page.content %>/_pages',
          dest: '<%= page.web %>',
          expand: true,
          src: ['*.hbs', '*.md']
        }]
      },
      quadblog: {
        options: {
          layout: 'blog.hbs',
          collections: [{
            title: 'pages',
            sortorder: 'descending' 
          }]
        },
        files: [{
          cwd: '<%= page.content %>/quadblog',
          dest: '<%= page.web %>/quadblog',
          expand: true,
          src: ['**/*.hbs', '**/*.md']
        }]
      }

    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default tasks to be run.
  grunt.registerTask('default', ['clean', 'copy', 'less:production', 'assemble']);
};
