module.exports = function(grunt) {
  var _init = new Function ('grunt', 'require', grunt.file.read('bower_components/rapido/grunt/init.js'));
  _init(grunt, require);
};
