module.exports = function(grunt) {
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-livescript');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.initConfig({

    project: grunt.file.readJSON("project.json"),

    sass: {
      dist: {
        options: {
          style: 'compressed',
          require: ['sass-globbing', 'sass-media_query_combiner']
        },
        files: {
          '<%= project.css.target %>': '<%= project.css.source %>'
        }
      }
    },

    sprite: {
      dist: {
        src: '<%= project.sprites.source %>',
        destImg: '<%= project.sprites.target %>',
        destCSS: '<%= project.sprites.stylesheet %>',
        'cssTemplate': 'bower_components/rapido/sprites/rapido.template.mustache',
        'cssVarMap': function (sprite) {
          sprite.name = 's-' + sprite.name;
        },
      }
    },

    concat: {
      ie: {
        src: ['<%= project.js.sources.ie %>'],
        dest: '<%= project.js.target.ie %>'
      },
      vendor: {
        src: ['<%= project.js.sources.vendor %>'],
        dest: '<%= project.js.target.vendor %>'
      },
      modernizr: {
        src: ['<%= project.js.sources.modernizr %>'],
        dest: '<%= project.js.target.modernizr %>'
      },
      app: {
        src: ['<%= project.js.sources.app %>'],
        dest: '<%= project.js.target.app %>'
      }
    },

    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        },
      },
      dist: {
        files: {
          '<%= project.js.target.ie %>': ['<%= project.js.sources.ie %>'],
          '<%= project.js.target.vendor %>': ['<%= project.js.sources.vendor %>'],
          '<%= project.js.target.modernizr %>': ['<%= project.js.sources.modernizr %>'],
          '<%= project.js.target.app %>': ['<%= project.js.sources.app %>']
        }
      }
    },

    livescript: {
      options: {
        bare: true,
      },
      dist: {
        files: {
          '<%= project.livescript.target %>': '<%= project.livescript.sources %>',
        }
      }
    },

    notify: {
      sass: {
        options: {
          message: 'Sass compiled',
        }
      },
      js: {
        options: {
          message: 'Javascript changed',
        }
      },
      ls: {
        options: {
          message: 'LiveScript compiled',
        }
      },
      template: {
        options: {
          message: 'Template changed',
        }
      },
    },

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['**/*.sass', '**/*.scss'],
        tasks: ['sass', 'notify:sass']
      },
      sprites: {
        files: ['**/*.png'],
        tasks: ['sprite', 'sass', 'notify:sass']
      },
      js: {
        files: ['<%= project.js.sources.app %>'],
        tasks: ['<%= project.js.action %>', 'notify:js']
      },
      ls: {
        files: ['<%= project.livescript.sources %>'],
        tasks: ['livescript', 'notify:ls']
      },
      template: {
        files: ['*.php', '*.html', '**/*.php', '**/*.html'],
        tasks: ['notify:template']
      },
    },
  });

  grunt.registerTask('default', ['watch']);

};
