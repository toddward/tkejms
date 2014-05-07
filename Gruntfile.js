'use strict';

module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      "test": {
        options: {
          reporter: 'spec'
        },
        src: ['tests/*.js']
      }
    },
    mocha_istanbul: {
      coverage: {
        src: 'tests/', // the folder, not the files,
        options: {
          mask: '*.js',
          "coverageFolder": "./tests/coverage"
        }
      }
    }
  });

  // Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');


  // Testing tasks
  grunt.registerTask("test", ["mochaTest"]);
  // Coverate tasks
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
  // Making grunt default to force in order not to break the project.

};