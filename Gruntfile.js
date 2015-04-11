module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: './test/**/*.js'
      }
    },
    jshint: {
      options: {jshintrc: true},
      lint: {src: ['**/*.js']}
    }
  });

  grunt.registerTask('test', ['lint', 'mochaTest']);
  grunt.registerTask('lint', ['jshint']);
};
