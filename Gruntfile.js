/*
 * Copyright 2014 David Herges <david@spektrakel.de>
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg:          grunt.file.readJSON('package.json'),
    metalsmith:   grunt.file.readJSON('metalsmith.json'),

    connect: {
      dev: {
        options: {
          hostname: 'localhost',
          port: 13008,
          base: '_gh_pages',
          keepalive: true,
          livereload : 35729,
          open: {
            appName: '/Applications/Google Chrome.app'
          }
        }
      }
    },

    watch: {
      livereload: {
        files: ['<%= metalsmith.source %>/**/*', 'partials/**/*', 'layouts/**/*'],
        tasks: ['default'],
        options: {
          livereaload: 35729
        }
      }
    }


//    copy: {
//      bower_components: {
//        files: [{
//          cwd: '',
//          expand: true,
//          src: 'bower_components/**/*',
//          dest: '<%= metalsmith.destination %>/vendor'
//        }]
//      }
//    },
//
//    less: {
//      development: {
//        options: {
//          sourceMap: true,
//          dumpLineNumbers: true
//        },
//        files: {'<%= metalsmith.destination %>/assets/css/styles.css': 'bower_components/bootstrap/less/bootstrap.less'}
//      },
//      production: {
//        options: {
//          cleancss: true,
//          compress: true
//        },
//        files: {'<%= metalsmith.destination %>/assets/css/styles.min.css': 'bower_components/bootstrap/less/bootstrap.less'}
//      }
//    },
//
//    clean: {
//      dist: {
//        files: [{
//          cwd: '<%= site.web %>',
//          expand: true,
//          src: ['**/*', '!vendor/**']
//        }]
//      }
//    },


  });

  grunt.registerTask('metalsmith', function() {
    var done = this.async()

    var exec = require('child_process').exec;
    var child = exec('node_modules/.bin/metalsmith')
    child.stdout.on('data', function(data) {
      grunt.log.writeln(data);
    })
    child.stderr.on('data', function(data) {
      grunt.log.error(data);
    })
    child.on('close', function(code) {
      grunt.log.ok('Metalsmith finished with exit code: ' + code);
      done()
    })  
  })


  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default tasks to be run.
  grunt.registerTask('default', ['metalsmith']);
};
