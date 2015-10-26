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
    },

    
    less: {
      development: {
        options: {
          sourceMap: true,
          dumpLineNumbers: true
        },
        files: {'_assets/css/styles.css': 'styles.less'}
      },
      production: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {'_assets/css/styles.min.css': 'styles.less'}
      }
    },

    copy: {
      bower_components: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: '**/*',
          dest: '_assets/vendor'
        }]
      }
    }



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

  grunt.registerTask('build', [
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'usemin'
  ]);

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default tasks to be run.
  grunt.registerTask('default', ['metalsmith']);
};
