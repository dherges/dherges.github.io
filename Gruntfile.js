/*
 * Copyright 2014 David Herges <david@spektrakel.de>
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    bower:  grunt.file.readJSON('.bowerrc'),
    pkg:    grunt.file.readJSON('package.json'),
    site:   grunt.file.readJSON('site.json'),

    connect: {
      dev: {
        options: {
          hostname: 'localhost',
          port: 8000,
          base: '<%= site.web %>',
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
          cwd: '<%= site.web %>',
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
          dest: '<%= site.web %>'
        }]
      },
      content: {
        files: [{
          cwd: 'content',
          expand: true,
          src: '**/*.jpg',
          dest: '<%= site.web %>'
        }]
      }
    },

    less: {
      development: {
        options: {
          sourceMap: true,
          dumpLineNumbers: true
        },
        files: {'<%= site.web %>/assets/css/styles.css': 'styles/styles.less'}
      },
      production: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {'<%= site.web %>/assets/css/styles.min.css': 'styles/styles.less'}
      }
    },

    assemble: {
      options: {
        flatten: true,

        // page template, layouts, partials
        layout: '<%= site.layout %>',
        layoutdir: '<%= site.layoutdir %>',
        partials: '<%= site.partials %>',
        helpers: '<%= site.helpers %>',

        // json data assigned to the templates
        data: '*.json',

        // plugins
        plugins: ['assemble-related-pages'],

      },
      pages: {
        files: [{
          cwd: '<%= site.content %>/_pages',
          dest: '<%= site.web %>',
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
          cwd: '<%= site.content %>/quadblog',
          dest: '<%= site.web %>/quadblog',
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
