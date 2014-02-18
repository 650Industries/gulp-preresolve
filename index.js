// through2 is a thin wrapper around node transform streams
var through2 = require('through2');
var gutil = require('gulp-util');
var preresolve = require('preresolve');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-preresolve';

// Plugin level function (dealing with files)
function gulpPreresolver(opts) {

  // Creating a stream through which each file will pass
  var stream = through.obj(function (file, enc, callback) {
    if (file.isNull()) {
      this.push(file); // Do nothing if no contents
      return callback();
    }

    if (file.isBuffer()) {
      this.push(new Buffer("abc", "utf-8"));
      //this.push(preresolve(file));
      return callback();
    }

    if (file.isStream()) {
      throw PluginError(PLUGIN_NAME, "Can't operate on streams yet :(");
    }
  });

  // returning the file stream
  return stream;
};

// Exporting the plugin main function
module.exports = gulpPreresolver;
