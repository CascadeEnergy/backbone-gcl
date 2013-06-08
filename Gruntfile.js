/*jslint node: true */

// Generated on 2013-06-06 using generator-backbone-module 0.0.0
'use strict';

module.exports = function(grunt) {

  var port = 8981;

  grunt.initConfig({
    copy: {
      dist: {
        files: [
          {src: ['backbone-gcl.js'], dest: './', cwd:'lib/', expand: true} 
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          'backbone-gcl.min.js': ['lib/backbone-gcl.js']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: port,
          base: '.'
        }
      }
    },
    shell: {
      'mocha-phantomjs': {
        command: 'mocha-phantomjs -R spec http://localhost:8000/testrunner.html',
        options: {
          stdout: true,
          stderr: true
        }
      },
      'ci': {
        command: 'mocha-phantomjs -R spec http://localhost:' + port +'/testrunner.html',
        options: {
          stdout: true,
          stderr: true
        }
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'util/web-server.js',
          watchedFolders: ['util']
        }
      }
    },
    jshint: {
      options: {
        laxcomma:true
      },
      tests: {
        options: {
          '-W030': true, // to.be.true syntax
        },
        src: ['test/**/*.js']
      },
      lib: ['Gruntfile.js', 'lib/**/*.js']
    }, 
    watch: {
      js: {
        files: ['**/*.js', '!**/nodemodules/**'],
        tasks: ['jshint', 'shell:mocha-phantomjs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['connect', 'shell:ci']);
  grunt.registerTask('build', ['copy', 'uglify']);
  grunt.registerTask('default', ['nodemon']);
};