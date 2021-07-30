
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      scripts: {
        src:[
          'scripts/shifty.js',
          'scripts/drawing.js',
          'scripts/point.js',
          'scripts/color.js',
          'drawing.js',
          'scripts/ui.js',
          'scripts/ui-tabs.js',
          'scripts/dot.js',
          'scripts/shape-builder.js',
          'scripts/shape.js'
        ],
        dest: 'release/shifty.js'
      }
    },

    watch: {
      scripts: {
        files: ['scripts/*.js'],
        tasks: ['clean:scripts', 'concat', 'jshint']
      },
      css: {
        files: ['css/*.css'],
        tasks: ['clean:css', 'cssmin']
      }
    },

    clean: {
      scripts: ['release/*.js'],
      css: ['release/*.css']
    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      combine: {
        files: {
          'release/styles.min.css': ['css/*.css']
        }
      }
    },

    jshint: {
      files: ['release/*.js'],
      options: {
        'esversion': 6,
        'globalstrict': true,
        'strict': true,
        'white': true,
        'indent': 2,
        'curly': true,
        'eqnull': true,
        'latedef': true,
        'newcap': true,
        'noarg': true,
        'eqeqeq': true,
        'immed': false,
        'undef': true,
        'unused': true,
        'browser': true,
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('release', ['clean', 'cssmin', 'concat', 'jshint']);

};
