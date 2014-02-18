var es = require('event-stream');
var preresolve = require('preresolve');
var stream = require('stream');

module.exports = function() {
  var doReplace = function(file, callback) {
    var isStream = file.contents && typeof file.contents.on === 'function' && typeof file.contents.pipe === 'function';
    var isBuffer = Buffer.isBuffer(file.contents);

    if (isStream) {
      return callback(new Error('gulp-preresolve: Cannot do preresolution replace on a stream'), file);
    }

    if (isBuffer) {
      file.contents = preresolve(file);
      return callback(null, file);
    }

    callback(null, file);
  };

  return es.map(doReplace);
};
