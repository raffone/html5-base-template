module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({

    compass: {
      dist: {
        options: {
          config: 'config.rb',
          //importPath: '../../../../../../frameworks/rapido/stylesheets/'
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      all: {
        files: {
          'assets/js/scripts.min.js': ['assets/js/scripts/*.js'],
          'assets/js/app.min.js': ['assets/js/app.js']
        }
      }
    },

    watch: {
      options: {
        interrupt: false,
        livereload: true
      },
      css: {
        fies: ['assets/**/*.sass', 'assets/**/*.scss', 'assets/images/s/*.png' ],
        tasks: ['compass']
      },
      php: {
        files: ['**/*.php', '*.php' ]
      },
      js: {
        files: ['assets/js/scripts/*.js', 'assets/js/app.js' ],
        tasks: ['uglify']
      },
    },
  });

  grunt.registerTask('default', ['watch']);

};
