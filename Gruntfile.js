module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-livescript');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  var options = {
    IE: [
    'bower_components/html5shiv/dist/html5shiv.js',
    'bower_components/selectivizr/selectivizr.js',
    'bower_components/respond/dest/respond.src.js',
    'bower_components/pickadate/lib/legacy.js'
  ], VENDOR: [
    'bower_components/jquery/jquery.js',
    'bower_components/bxSlider/jquery.bxslider.js',
    'bower_components/easytabs/lib/jquery.easytabs.js',
    'bower_components/fancybox/source/jquery.fancybox.js',
    'bower_components/jquery-backstretch/jquery.backstretch.js',
    'bower_components/jquery.dotdotdot/src/js/jquery.dotdotdot.js',
    'bower_components/rapido/dist/js/rapido.js',
  ], MODERNIZR: [
    'teamofdrivers/static/js/vendor/modernizr/modernizr.js'
  ], APP: [
    'assets/js/app.js'
  ]};

  grunt.initConfig({

    sass: {
      min: {
        options: {
          style: 'compressed',
          require: ['sass-globbing', 'sass-media_query_combiner']
        },
        files: {
          'assets/css/style.css': 'assets/sass/style.sass',
        }
      }
    },

    concat: {
      ie: {
        src: options.IE,
        dest: 'assets/js/ie.min.js'
      },
      vendor: {
        src: options.VENDOR,
        dest: 'assets/js/vendor.min.js'
      },
      modernizr: {
        src: options.MODERNIZR,
        dest: 'assets/js/modernizr.min.js'
      },
      app: {
        src: options.APP,
        dest: 'assets/js/app.min.js'
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
          'assets/js/ie.min.js': options.IE,
          'assets/js/vendor.min.js': options.VENDOR,
          'assets/js/modernizr.min.js': options.MODERNIZR,
          'assets/js/app.min.js': options.APP
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['**/*.sass', '**/*.scss', '**/*.png' ],
        tasks: ['sass']
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
