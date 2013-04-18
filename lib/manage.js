var fs = require('fs');
var path = require('path');
var url = require('url');
var https = require('https');
var spawn = require('win-spawn');
var initDir = require('./helper').initDir;
require('colorful').colorful();

module.exports = function(commander) {
  if (commander.install) {
    install(commander.install);
    return false;
  }
  return true;
};

// install('aralejs/template-arale')
function install(template) {
  var git = 'https://github.com/' + template;
  var name = git.split('/').pop();
  // template-(xxx)
  if (/^template-[a-z]*$/g.test(name)) {
    name = name.replace(/^template-([a-z]*)$/g, '$1');
  }
  // aa-bb-(xxx)
  else if (/-/g.test(name)) {
    name = name.split('-').pop();
  }

  var parsed = url.parse(git);
  parsed.agent = false;
  parsed.method = 'HEAD';
  https.get(parsed, function(res) {
    if (res.statusCode === 200) {
      var dest = path.join(initDir, name);

      console.log();
      console.log('  Downloading: '.to.cyan.bold.color + name + ' from ' + dest);

      fs.exists(dest, function(exists) {
        if(exists) {
          console.log();
          console.log('  Found: '.to.cyan.bold.color + dest + ' exist');
          return;
        }

        spawn('git', ['clone', git, dest])
          .on('close', function (code) {
            console.log();
            console.log('  Downloaded: '.to.cyan.bold.color + name + ' to ' + dest);
          });
      });
    } else {
      console.log();
      console.error('  Not Found: '.to.cyan.bold.color + git);
    }
  });
}

function update(template) {

}

function upgrade() {

}

function list() {

}