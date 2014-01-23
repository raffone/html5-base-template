module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.initConfig({

    compass: {
      dist: {
        options: {
          config: 'config.rb',
          importPath: '../../../frameworks/rapido/stylesheets/'
        }
      }
    },

    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        },
      },
      all: {
        files: {
          'assets/js/ie.min.js': [
            'assets/js/vendor/html5shiv/dist/html5shiv.js',
            'assets/js/vendor/selectivizr.js',
            'assets/vendor/respond/dest/respond.js',
          ],
          'assets/js/vendor.min.js': [
            'assets/js/vendor/jquery/jquery.js',
            'assets/js/vendor/bxSlider/jquery.bxslider.js',
            'assets/js/vendor/easytabs/lib/jquery.easytabs.js',
            'assets/js/vendor/fancybox/source/jquery.fancybox.js',
            'assets/js/vendor/jquery-backstretch/jquery.backstretch.js',
            'assets/js/vendor/jquery.dotdotdot/src/js/jquery.dotdotdot.js',
            'assets/js/vendor/rapido/dist/js/rapido.js',
          ],
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
        files: ['**/*.sass', '**/*.scss', '**/*.png' ],
        tasks: ['compass']
      },
      php: {
        files: ['*.php', '*.html', '**/*.php', '**/*.html' ]
      },
      js: {
        files: ['assets/js/app.js' ],
        tasks: ['uglify']
      },
    },
  });

  grunt.registerTask('default', ['watch']);

};
