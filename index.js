var spm = require('spm')

exports.registerCommand = function() {
  spm.registerCommand('init', 'spm-init', 'initialize')
}
