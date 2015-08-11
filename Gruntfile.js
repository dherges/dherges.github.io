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
          open: {
            appName: '/Applications/Google Chrome.app'
          }
        }
      }
    },

    copy: {
      bower_components: {
        files: [{
          cwd: '',
          expand: true,
          src: 'bower_components/**/*',
          dest: '<%= metalsmith.destination %>/vendor'
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
//
//    copy: {
//      assets: {
//        files: [{
//          cwd: '',
//          expand: true,
//          src: 'assets/**/*',
//          dest: '<%= site.web %>'
//        }]
//      },
//      content: {
//        files: [{
//          cwd: 'content',
//          expand: true,
//          src: '**/*.jpg',
//          dest: '<%= site.web %>'
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
//        files: {'<%= site.web %>/assets/css/styles.css': 'styles/styles.less'}
//      },
//      production: {
//        options: {
//          cleancss: true,
//          compress: true
//        },
//        files: {'<%= site.web %>/assets/css/styles.min.css': 'styles/styles.less'}
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

//    var metalsmith = new Metalsmith(__dirname )
//    
//    var site = grunt.config.get('site')
//
//    metalsmith.metadata(site.metadata)
//              .source('content')
//              .destination('_gh_pages')
//
//    var plugins = normalizePlugins(site.plugins);
//    plugins.forEach(function (plugin) {
//      for (var name in plugin) {
//        var opts = plugin[name]
//        var fn
//
//        try {
//          fn = require(name)
//        } catch (e) {
//          return
//        }
//
//        metalsmith.use(fn(opts))
//      }
//    })
//
//    function normalizePlugins (plugins) {
//      if (plugins instanceof Array) {
//        return plugins
//      }
//      var ret = []
//
//      for (var key in plugins) {
//        var plugin = {}
//        plugin[key] = plugins[key]
//        ret.push(plugin)
//      }
//
//      return ret
//    }
//console.log(metalsmith)
//
//    metalsmith.build(function(err) {
//console.log("done...")
//      if (err) {
//        grunt.log.error('metalsmith threw error' + err)
//        throw err
//      }
//
//      grunt.log.writeln('Generated files from ' + metalsmith.source() + ' to ' + metalsmith.destination())
//    })
  
  })
  
  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default tasks to be run.
  grunt.registerTask('default', ['']);
};
