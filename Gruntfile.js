module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      unit: {
        options: {
          reporter: 'spec'
        },
        src: './test/unit/**/*.js'
      },
      integration: {
        options: {
          reporter: 'spec'
        },
        src: './test/integration/**/*.js'
      }
    },
    jshint: {
      options: {jshintrc: true},
      lint: {src: ['**/*.js']}
    }
  });

  grunt.registerTask('integration', ['mochaTest:integration']);
  grunt.registerTask('test', ['lint', 'mochaTest:unit']);
  grunt.registerTask('lint', ['jshint']);
};
